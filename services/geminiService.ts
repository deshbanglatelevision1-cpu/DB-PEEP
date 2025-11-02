import { GoogleGenAI } from "@google/genai";
import type { SearchResult, Source } from '../types';

export async function runSearch(query: string): Promise<SearchResult> {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Search query: "${query}". Provide a comprehensive and well-structured answer based on the search results.`,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text;
    
    const rawSources = response.candidates?.[0]?.groundingMetadata?.groundingChunks ?? [];
    const sources: Source[] = rawSources
      .map((chunk: any) => ({
        uri: chunk.web?.uri,
        title: chunk.web?.title,
      }))
      .filter((source: Source) => source.uri && source.title);

    // Deduplicate sources based on URI
    const uniqueSources = Array.from(new Map(sources.map(s => [s.uri, s])).values());
    
    return { text, sources: uniqueSources };
  } catch (error) {
    console.error("Gemini API call failed:", error);
    throw new Error("Failed to get a response from the AI model.");
  }
}