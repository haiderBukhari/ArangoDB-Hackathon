# **Graph-Based Drug Discovery Platform**

## **Overview**
AI-Driven Drug Discovery Agent leverages graph-based analytics and biomedical databases to accelerate drug research, uncover drug-target interactions, and optimize drug repurposing strategies in real time.

## **Problem Statement**
Traditional drug discovery is slow, expensive, and highly inefficient:
- High costs (~$1.1 billion per drug)
- Long development timelines (10-15 years)
- High failure rates (~90%)
- Complex biomedical data that is difficult to analyze manually

## **Solution**
This project integrates **ArangoDB, NetworkX, cuGraph, Flask, and Next.js** to create an AI-powered agent that:
- **Captures drug-target relationships** using graph databases.
- **Automates querying** with AI-powered AQL and cuGraph execution.
- **Leverages GPU-accelerated analytics** for large-scale computations.
- **Provides real-time insights** with a user-friendly dashboard.

---
## **Installation & Setup**

### **1. Clone the Repository**
```bash
  git clone https://github.com/haiderBukhari/ArangoDB-Hackathon
  cd "ArangoDB-Hackathon"
```

### **2. Backend Setup (Flask)**
#### **Install Dependencies**
```bash
cd "Backend Flask"
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
pip install -r requirements.txt
```

#### **Run Flask Backend**
```bash
flask run --host=0.0.0.0 --port=5000
```

---
### **3. Frontend Setup (Next.js)**
#### **Install Dependencies**
```bash
cd "Frontend NextJS"
npm install
```

#### **Run Next.js Frontend**
```bash
npm run dev
```

---
### **4. Jupyter Notebook (Optional for Analysis)**
```bash
cd "Jupyter Notebook"
jupyter notebook
```

## **Usage**
1. Open `http://localhost:3000/` to access the AI-powered drug discovery dashboard.
2. Enter a query (e.g., "Find all drugs that target the gene SLC47A1, have a side effect, and are approved").
3. The system processes the query via **Flask (AQL + cuGraph execution)** and returns insights in real-time.
4. Explore results, visualize drug interactions, and refine your research effortlessly!

## **Tech Stack**
- **Graph Database:** ArangoDB
- **Graph Analytics:** NetworkX, cuGraph
- **Backend:** Flask (Python)
- **Frontend:** Next.js (React)
- **AI Query Processing:** AQL, Natural Language Processing (NLP)

## **Contributing**
Feel free to submit issues and pull requests to improve the project. 🚀

## **License**
This project is licensed under the MIT License.