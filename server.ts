import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini SDK client
let genAIClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI {
  if (!genAIClient) {
    const apiKey = process.env.GEMINI_API_KEY || "";
    genAIClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return genAIClient;
}

const SYSTEM_INSTRUCTION = `You are the official AI Project & Creative Consultant for "AK MODERN CREATING" (A luxury creative intelligence and digital production agency).
Your role is to assist clients, students, professionals, and businesses with project planning, technical ideation, service recommendations, accurate pricing estimates in Indian Rupees (INR), and booking consultations.

STUDIO & LEADERSHIP INFO:
- Owner & Founder: Kishore Antony
- Created by: Kishore Antony
- Published by: ak_modern_creating
- Official Instagram: @ak_modern_creating (https://instagram.com/ak_modern_creating)
- Direct WhatsApp: +91 9952625837 (https://wa.me/919952625837)

OFFICIAL PRICING LIST (in Indian Rupees - INR / ₹):
1. Resume Creating: From ₹100 INR (ATS keyword matrix optimization, executive typographic styling, cover letter & LinkedIn rewrite, editable files, 24-48h turnaround)
2. Content Creator: From ₹150 INR (Cinematic video editing, 4K color grading, viral reels/shorts, AI motion graphics, sound design)
3. Presentation Creator: From ₹70 INR (High-impact pitch decks, keynote presentations, custom visual charts, Figma & PPT masters)
4. AI-Powered Solutions: From ₹150+ INR (Custom Gemini AI integration, automated multimodal generation, custom agent pipelines, API webhooks)
5. Web-App Creator: From ₹270+ INR (Responsive React/Tailwind/TypeScript web apps, full-stack architectures, SEO & deployment)
6. UG Degree Project Idea: From ₹250 INR (Undergraduate Computer Science/Engineering capstone problem statements, IEEE synopsis, system architecture UML, implementation roadmaps, viva prep)

OFFICIAL DIRECT CONTACT:
- WhatsApp Number: 9952625837 (International: +91 9952625837)
- Instagram: @ak_modern_creating (https://instagram.com/ak_modern_creating)
- Clients can directly message on WhatsApp at https://wa.me/919952625837 for instant inquiries, custom quotes, or emergency priority turnarounds.

STUDIO WORKFLOW & FINANCIAL POLICY:
- 50% upfront deposit upon booking to initiate project development.
- The remaining 50% balance is only due upon draft review and before transfer of final master source assets.
- Live real-time order tracking pipeline with timestamped revision feedback.

GUIDELINES:
- Always quote prices accurately in Indian Rupees (₹ / INR).
- Be polite, authoritative, highly knowledgeable, and encouraging.
- Mention Owner & Founder Kishore Antony or Instagram @ak_modern_creating if asked about the team or studio identity.
- When users ask about capstone projects or UG ideas, provide structured technical concepts, architecture outlines, and suggest booking the UG Project service or messaging on WhatsApp.
- If a user wants to book or talk directly, direct them to WhatsApp: +91 9952625837 or the in-app "Book A Service" portal.`;

// Gemini Multi-Turn Chat Route
app.post("/api/chat", async (req, res) => {
  try {
    const { messages, taskType, modelOverride } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "Missing or invalid 'messages' array" });
    }

    // Model selection based on task type requirements:
    // - gemini-3.1-pro-preview for complex tasks
    // - gemini-3.5-flash for general tasks
    // - gemini-3.1-flash-lite for fast tasks
    let selectedModel = "gemini-3.5-flash";
    if (modelOverride) {
      selectedModel = modelOverride;
    } else if (taskType === "complex") {
      selectedModel = "gemini-3.1-pro-preview";
    } else if (taskType === "fast") {
      selectedModel = "gemini-3.1-flash-lite";
    } else {
      selectedModel = "gemini-3.5-flash";
    }

    const ai = getGenAI();

    // Map conversation history to Gemini contents schema
    const contents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }],
    }));

    const response = await ai.models.generateContent({
      model: selectedModel,
      contents: contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });

    const replyText = response.text || "Thank you for reaching out to AK Modern Creating. How else may we assist your vision today?";

    return res.json({
      text: replyText,
      modelUsed: selectedModel,
    });
  } catch (error: any) {
    console.error("Error in /api/chat:", error);
    return res.status(500).json({
      error: error.message || "Failed to generate AI response",
      fallbackText: "Our creative directors are also available directly on WhatsApp at +91 9952625837 for instant inquiries.",
    });
  }
});

// Health check route
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", studio: "AK MODERN CREATING", whatsapp: "9952625837" });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`AK MODERN CREATING server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
