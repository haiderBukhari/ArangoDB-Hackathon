from flask import Flask, request, jsonify
import networkx as nx
import nx_arangodb as nxadb
from arango import ArangoClient
import os
import re
from langgraph.prebuilt import create_react_agent
from langchain_openai import ChatOpenAI
from langchain_core.tools import tool
from langchain_community.graphs import ArangoGraph
from openai import OpenAI

app = Flask(__name__)

# Initialize ArangoDB client and graph
db = ArangoClient(hosts="https://024b49e82b10.arangodb.cloud:8529").db(username="root", password="xxxx", verify=True)
G_adb = nxadb.Graph(name="drug_discovery", db=db)

# Set OpenAI API key
os.environ["OPENAI_API_KEY"] = "sk-proj-xxxx"

client = OpenAI(api_key="sk-proj-xxxx")

arango_graph = ArangoGraph(db)

VALID_NX_ALGORITHMS = {
    "community detection": [
        "networkx.algorithms.community.girvan_newman",
        "networkx.algorithms.community.label_propagation_communities",
        "networkx.algorithms.community.louvain_communities",
    ],
    "centrality": [
        "nx.degree_centrality",
        "nx.betweenness_centrality",
        "nx.pagerank",
        "nx.closeness_centrality",
    ],
    "shortest path": [
        "nx.shortest_path",
        "nx.dijkstra_path",
        "nx.astar_path",
    ],
    "clustering": [
        "nx.clustering",
        "nx.average_clustering",
    ],
}

def get_table(query):
    prompt = """
    You are tasked with formatting the query response into a clean, structured table in HTML format. Remember the table is structured and contains only the information available in the query. Do not write anything explicitly from your side.

    Query: `Graph-Based Response:
    Here are the top 5 side effects for drugs with a molecular weight greater than 500:

    1. **Cyanocobalamin**
       - Side Effect: Uterine perforation
       - LLR: 17495.347

    2. **Cyanocobalamin**
       - Side Effect: Thirst
       - LLR: 5482.597

    3. **Insulin Glargine**
       - Side Effect: Thirst
       - LLR: 5482.597

    4. **Somatropin**
       - Side Effect: Thirst
       - LLR: 5482.597

    5. **Edoxaban**
       - Side Effect: Thirst
       - LLR: 5482.597

    These results show the drugs and their associated side effects, sorted by the log-likelihood ratio (LLR) of the side effects`

    It will generate the table with the following format but in HTML:

    <table>
    <tr>
        <th>Drug</th>
        <th>LLR</th>
        <th>Side Effect</th>
    </tr>
    <tr>
        <td>Cyanocobalamin</td>
        <td>17495.347</td>
        <td>Uterine perforation</td>
    </tr>
    <tr>
        <td>Cyanocobalamin</td>
        <td>5482.597</td>
        <td>Thirst</td>
    </tr>
    <tr>
        <td>Insulin Glargine</td>
        <td>5482.597</td>
        <td>Thirst</td>
    </tr>
    <tr>
        <td>Somatropin</td>
        <td>5482.597</td>
        <td>Thirst</td>
    </tr>
    <tr>
        <td>Edoxaban</td>
        <td>5482.597</td>
        <td>Thirst</td>
    </tr>
    </table>
    """

    # Make the API call to generate the table
    completion = client.chat.completions.create(
        model="gpt-4o",  # Use the GPT-4o model
        messages=[
            {"role": "developer", "content": prompt},
            {"role": "user", "content": query}
        ]
    )

    # Clean the result by stripping excess newlines and whitespace
    completion_content = completion.choices[0].message.content

    # If you want to remove the markdown code block and just get the HTML table
    import re

    # Remove the markdown code block wrapper ```html and ```
    table_html = re.sub(r'```html\n|\n```', '', completion_content)

    # Add styles for borders, margin, and padding
    table_html = """
    <style>
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            padding: 10px;
            text-align: left;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
        }
    </style>
    """ + table_html

    return table_html

@tool
def text_to_aql_to_text(query: str):
    """
    Executes an AQL query on ArangoDB using the drug discovery schema.

    **Schema Overview:**
    - **Nodes (drug_discovery_node) these are not label and can be accessed by .type**:
      - Drug: _key, label, mol_weight, smiles
      - Target: _key, label, gene, swissprot
      - Approval: _key, label, status, applicant, type
      - SideEffect: _key, label, llr
      - ProteinStructure: _key, label, ligand, method

    - **Edges (drug_discovery_node_to_drug_discovery_node)**:
      - INTERACTS_WITH: Drug → Target (activity, moa)
      - HAS_APPROVAL: Drug → Approval (type, applicant)
      - HAS_SIDE_EFFECT: Drug → SideEffect (llr)
      - BINDS_TO: Drug → ProteinStructure (ligand, method)

    Do not assume information that is not explicitly stated in the schema. Ensure the AQL query follows the exact structure given above

    **Important Constraint:**
    - Always use `e.relation` **(if it exists)** instead of `e.label` when writing AQL queries.
    - Ensure the generated AQL query retrieves relevant **drug discovery** information **accurately and efficiently**.
    """

    schema_context = """
    You are working with an ArangoDB database for drug discovery.

    - **Node Collection**: `drug_discovery_node`
    - **Edge Collection**: `drug_discovery_node_to_drug_discovery_node`

    **Edge Relationships:**
    - `INTERACTS_WITH`, `HAS_APPROVAL`, `HAS_SIDE_EFFECT`, `BINDS_TO`

    Always use `e.relation` to reference edge relationships.

    Always use these collections and relationships using (e.relation if exists) when writing AQL queries.
    """

    prompt = f"""
    {schema_context}

    User Query: "{query}"

    Generate an optimized AQL query using `drug_discovery_node` (for nodes) and
    `drug_discovery_node_to_drug_discovery_node` (for edges). Ensure the query
    retrieves relevant drug discovery information accurately.

    **Case Sensitivity Notice:**
    - Drug names are always **processed in lowercase** for accurate matching.

    **Generated AQL Query:**
    """

    print("Generated AQL Query:\n", "-" * 50)
    print(prompt)

    llm = ChatOpenAI(temperature=0, model_name="gpt-4o")
    result = llm.invoke(prompt).content

    # Extract AQL Query
    aql_query = re.search(r"```aql\n(.*?)\n```", result, re.DOTALL)
    aql_query = aql_query.group(1) if aql_query else "No AQL query found."

    # Execute AQL Query
    aql_result = db.aql.execute(aql_query)

    return f"**AQL Query:**\n```aql\n{aql_query}\n```\n\n**Graph Data:** {list(aql_result)}"

@tool
def text_to_nx_algorithm_to_text(query):

    """This tool is available to invoke a NetworkX Algorithm on
    the ArangoDB Graph. You are responsible for accepting the
    Natural Language Query, establishing which algorithm needs to
    be executed, executing the algorithm, and translating the results back
    to Natural Language, with respect to the original query.

    If the query (e.g traversals, shortest path, etc.) can be solved using the Arango Query Language, then do not use
    this tool.
    """

    llm = ChatOpenAI(temperature=0, model_name="gpt-4o")

    text_to_nx = llm.invoke(f"""
    I have a NetworkX Graph called `G_adb`.

      **Schema Overview:**
    - **Nodes (drug_discovery_node) these are not label and can be accessed by .type**:
      - Drug: _key, label, mol_weight, smiles
      - Target: _key, label, gene, swissprot
      - Approval: _key, label, status, applicant, type
      - SideEffect: _key, label, llr
      - ProteinStructure: _key, label, ligand, method

    - **Edges (drug_discovery_node_to_drug_discovery_node)**:
      - INTERACTS_WITH: Drug → Target (activity, moa)
      - HAS_APPROVAL: Drug → Approval (type, applicant)
      - HAS_SIDE_EFFECT: Drug → SideEffect (llr)
      - BINDS_TO: Drug → ProteinStructure (ligand, method)

    - **Node Collection**: `drug_discovery_node`
    - **Edge Collection**: `drug_discovery_node_to_drug_discovery_node`

    I have the following graph analysis query: {query}.

    Generate the Python Code required to answer the query using the `G_adb` object.

    Be very precise on the NetworkX algorithm you select to answer this query. Think step by step.

    Only assume that networkx is installed, and other base python dependencies.

    Here is some of the valid algorithms which can be used {VALID_NX_ALGORITHMS}

    Always set the last variable as `FINAL_RESULT`, which represents the answer to the original query.

    Only provide python code that I can directly execute via `exec()`. Do not provide any instructions.

    Make sure that `FINAL_RESULT` stores a short & consice answer. Avoid setting this variable to a long sequence.

    Your code:
    """).content

    text_to_nx_cleaned = re.sub(r"^```python\n|```$", "", text_to_nx, flags=re.MULTILINE).strip()

    global_vars = {"G_adb": G_adb, "nx": nx}
    local_vars = {}

    try:
        exec(text_to_nx_cleaned, global_vars, local_vars)
        text_to_nx_final = text_to_nx
    except Exception as e:
        return f"EXEC ERROR: {e}"

    FINAL_RESULT = local_vars["FINAL_RESULT"]

    nx_to_text = llm.invoke(f"""
        I have a NetworkX Graph called `G_adb`. It has the following schema: {arango_graph.schema}

        I have the following graph analysis query: {query}.

        I have executed the following python code to help me answer my query:

        ---
        {text_to_nx_final}
        ---

        The `FINAL_RESULT` variable is set to the following: {FINAL_RESULT}.

        Based on my original Query and FINAL_RESULT, generate a short and concise response to
        answer my query.

        Your response:
    """).content

    return nx_to_text

@tool
def text_to_table(query: str):
    """
    It will generate the table.
    
    **Functionality Overview:**
    - The function receives a query as input.
    - It calls the `get_table` function to process the query and format the result into a structured HTML table.
    - The table is enriched with CSS styles to improve its visual presentation, including borders, padding, and text alignment.

    **Return:**
    - This function returns the query's results in a structured HTML table format with added CSS styles.

    **Parameters:**
    - `query` (str): The query input, typically in a text format that will be used for data extraction and display.

    **Example Usage:**
    ```python
    query = "Here are the top 5 side effects for drugs with a molecular weight greater than 500."
    table_html = generate_table_from_query(query)
    print(table_html)
    """

    # Query to pass to the table generation function
    formatted_table = get_table(query)

    return f"{formatted_table}"


tools = [text_to_aql_to_text, text_to_nx_algorithm_to_text, text_to_table]

def query_graph(query: str):
    llm = ChatOpenAI(temperature=0, model_name="gpt-4o")
    app = create_react_agent(llm, tools)
    
    final_state = app.invoke({"messages": [{"role": "user", "content": query}]})

    response_content = final_state["messages"][-1].content

    return f"Graph-Based Response:\n{response_content}"


@app.route('/query', methods=['POST'])
def query():
    data = request.get_json()
    query = data.get('query')
    if not query:
        return jsonify({"error": "Query is required"}), 400

    response = query_graph(query)
    return jsonify({"response": response})

@app.route('/')
def hello_world():
    return 'Hello, World!'


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))