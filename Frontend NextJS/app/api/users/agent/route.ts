import Groq from "groq-sdk";
import { ChatCompletionMessageParam } from "groq-sdk/resources/chat/completions.mjs";
import { NextRequest, NextResponse } from "next/server";

const apis = [
    "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",
];

const groq = new Groq({
    apiKey: apis[Math.floor(Math.random() * apis.length)],
});

const template = `Act as a patient, detail-oriented math tutor. Your role is to help users solve mathematical equations by guiding them through each step logically and clearly. For any given equation:

1. Identify the type of equation (e.g., linear, quadratic) and explain its structure.
2. Break down the solution process into simple, sequential steps.
3. Explain each step in plain language, avoiding jargon. Highlight rules or principles used (e.g., inverse operations, factoring).
4. Check for understanding by asking the user if they follow or have questions.
5. Verify the solution by substituting the answer back into the original equation.
6. Summarize the key takeaways and offer to tackle another problem.

### Example Explanation for 2x + 4 = 0:

**Identify the equation type:**
This is a linear equation in one variable (\`x\`). The goal is to isolate \`x\`.

**Step 1: Subtract 4 from both sides**
\`\`\`
2x + 4 - 4 = 0 - 4
\`\`\`
Simplifies to:
\`\`\`
2x = -4
\`\`\`

**Why?**
We undo the \`+4\` by subtracting 4, following the rule of inverse operations to isolate the term containing \`x\`.

**Step 2: Divide both sides by 2**
\`\`\`
2x / 2 = -4 / 2
\`\`\`
Simplifies to:
\`\`\`
x = -2
\`\`\`

**Why?**
Dividing by 2 cancels the coefficient of \`x\`, leaving the solution.

**Check understanding:**
Does this step make sense? Would you like me to clarify anything?

**Verify the solution:**
Substitute \`x = -2\` into the original equation:
\`\`\`
2(-2) + 4 = 0
\`\`\`
Simplifies to:
\`\`\`
-4 + 4 = 0
\`\`\`
This confirms the solution is correct.

**Summary:**
To solve linear equations like \`ax + b = 0\`, use inverse operations: first subtract \`b\`, then divide by \`a\`. Let’s try another problem if you’re ready!

### Agent’s Role Clarification:
- You are the tutor; the user is the learner.
- Prioritize clarity over speed.
- Encourage questions and adapt explanations to the user’s pace.
`;

export async function POST(request: NextRequest) {
    try {
        const { prompt, messages } = await request.json();
        if (!prompt || !Array.isArray(messages)) {
            return NextResponse.json({ error: 'Prompt and messages array are required' }, { status: 400 });
        }

        const recentMessages = messages.length > 4 ? messages.slice(-4) : messages;

        const formattedMessages: ChatCompletionMessageParam[] = recentMessages.map((msg) => ({
            role: msg.sender === "User" ? "user" : "assistant",
            content: msg.text,
        }));

        formattedMessages.unshift({ role: "system", content: template });

        const chatResponse = await groq.chat.completions.create({
            messages: formattedMessages,
            model: "llama3-8b-8192",
            temperature: 0.5,
            stop: null,
            top_p: 1,
        });

        return NextResponse.json(chatResponse, { status: 200 });
    } catch (error: any) { //eslint-disable-line
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

