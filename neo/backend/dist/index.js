import dotenv from "dotenv";
import express from "express";
import { GoogleGenAI } from "@google/genai";
import { BASE_PROMPT, getSystemPrompt } from "./prompt.js";
import { reactBasePrompt } from "./defaults/react.js";
import { nodeBasePrompt } from "./defaults/node.js";
import cors from "cors";
dotenv.config();
const port = process.env.SERVER_PORT || 3000;
const app = express();
const ai = new GoogleGenAI({});
app.use(express.json());
app.use(cors());
const querryMainLLM = async (prompt) => {
    // ************to get content block at once************
    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `${prompt}`,
        config: {
            systemInstruction: await getSystemPrompt(),
            temperature: 0.2,
        },
    });
    return response.text;
    // ******** to get streams *******
    // async function streamResponse() {
    //   const model = "gemini-2.5-flash"; // Or another streaming-capable model
    //   const prompt = "Explain the importance of streaming AI responses in user experience.";
    //   try {
    //     const responseStream = await ai.models.generateContentStream({
    //       model: model,
    //       contents: prompt,
    //     });
    //     console.log("Streaming response:");
    //     // Loop through the stream chunks and print them as they arrive
    //     for await (const chunk of responseStream) {
    //       process.stdout.write(chunk.text as any);
    //     }
    //     console.log(); // Add a newline at the end
    //   } catch (error) {
    //     console.error("An error occurred:", error);
    //   }
    // }
    // streamResponse();
};
const querryLLM = async (prompt) => {
    const response = await ai.models.generateContent({
        model: "gemma-3-27b-it",
        contents: prompt,
    });
    return response.text;
};
app.post("/api/template", async (req, res) => {
    try {
        const { prompt } = req.body;
        if (!prompt) {
            return res.status(400).json({ error: "Prompt is required" });
        }
        const rawResponse = await querryLLM(`Give me a single word out of {node, react}. 
Only return the word, no explanation.
Prompt: ${prompt}`);
        const result = rawResponse?.trim().toLowerCase();
        console.log("LLM result:", result);
        if (result === "react") {
            return res.status(200).json({
                prompts: [
                    BASE_PROMPT,
                    `Here is an artifact that contains all files of the project visible to you.
Consider the contents of ALL files in the project.

${reactBasePrompt}

Here is a list of files that exist on the file system but are not being shown to you:

  - .gitignore
  - package-lock.json`,
                ],
                uiPrompts: [reactBasePrompt],
            });
        }
        if (result === "node") {
            return res.status(200).json({
                prompts: [
                    `Here is an artifact that contains all files of the project visible to you.
Consider the contents of ALL files in the project.

${nodeBasePrompt}

Here is a list of files that exist on the file system but are not being shown to you:

  - .gitignore
  - package-lock.json`,
                ],
                uiPrompts: [nodeBasePrompt],
            });
        }
        // 🔁 fallback if LLM response is unexpected
        return res.status(400).json({
            error: "Unable to determine template type",
            llmResponse: rawResponse,
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
    }
});
app.post("/chat", async (req, res) => {
    const messages = req.body.messages;
    console.log(messages);
    const response = querryMainLLM(messages);
    res.json(response);
});
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
//# sourceMappingURL=index.js.map