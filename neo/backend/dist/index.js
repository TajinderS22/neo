import dotenv from 'dotenv';
import express from "express";
import { GoogleGenAI } from "@google/genai";
import { BASE_PROMPT, getSystemPrompt } from './prompt.js';
import { recatBasePrompt } from './defaults/react.js';
import { nodeBasePrompt } from './defaults/node.js';
dotenv.config();
const port = process.env.SERVER_PORT || 3000;
const app = express();
const ai = new GoogleGenAI({});
app.use(express.json());
const querryMainLLM = async (prompt) => {
    // ************to get content block at once************
    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `${prompt}`,
        config: {
            systemInstruction: await getSystemPrompt(),
            temperature: 0.2
        }
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
app.get("/api/template", async (req, res) => {
    console.log(req.body);
    const prompt = req.body.prompt;
    const response = await querryLLM(`give me single word out of {node, react} which is more relevent by examining the the prompt. Prompt:${prompt} `);
    if (response == "React" || 'react') {
        res.json({
            prompts: [BASE_PROMPT, recatBasePrompt]
        });
        return;
    }
    if (response == "Node" || "node") {
        return res.json({
            prompts: [nodeBasePrompt]
        });
    }
});
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
//# sourceMappingURL=index.js.map