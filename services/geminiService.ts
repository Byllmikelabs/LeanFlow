
import { GoogleGenAI, Type } from "@google/genai";
import { ProcessStep, WasteType } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getLeanOptimizationAdvice = async (steps: ProcessStep[]) => {
  const model = "gemini-3-flash-preview";
  
  const prompt = `
    Analyze the following industrial process workflow and provide Lean optimization advice:
    ${JSON.stringify(steps, null, 2)}
    
    Identify potential bottlenecks, categorize the wastes (TIMWOODS), and suggest 3 prioritized experiments (PDCA cycles) to improve throughput.
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            bottleneckAnalysis: { type: Type.STRING },
            wasteSummary: { type: Type.ARRAY, items: { type: Type.STRING } },
            recommendations: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  action: { type: Type.STRING },
                  impact: { type: Type.STRING },
                  effort: { type: Type.STRING }
                },
                required: ["title", "action", "impact", "effort"]
              }
            }
          },
          required: ["bottleneckAnalysis", "wasteSummary", "recommendations"]
        }
      }
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Gemini Error:", error);
    return null;
  }
};
