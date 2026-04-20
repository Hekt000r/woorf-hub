export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from "next/server";
import { groq } from "@ai-sdk/groq";
import { generateText } from "ai";
// Import the search logic directly to avoid Axios/Localhost issues
import { getSearchResults } from "../AI-Tool-DBSearch/route"; 



async function QueryGenerate(prompt: string) {
  const response = await generateText({
    model: groq(`llama-3.3-70b-versatile`),
    system: `Return ONLY a valid JSON array of strings (names of open-source programs). No markdown, no backticks, no text before or after. Max 7 results. Example: ["Brave", "GIMP", "Krita"]`,
    prompt: prompt,
  });
  // Clean up potential markdown formatting just in case
  return response.text.replace(/```json|```/g, "").trim();
}

async function GenerateResponse(DBInput: string) {
  const response = await generateText({
    model: groq(`llama-3.3-70b-versatile`),
    system: `You are a FOSS assistant for Woorf. Use the provided JSON database data to answer. Add official links. If the list is empty, apologize and say no programs were found in the database.`,
    prompt: `Database Data: ${DBInput}`,
  });
  return response.text;
}

export async function GET(req: NextRequest) {
  const prompt = req.nextUrl.searchParams.get("prompt");
  console.log("🚀 STEP 1: Received Prompt:", prompt);

  if (!prompt) return NextResponse.json({ status: 403, error: "No prompt" });

  try {
    // 1. Get names from AI
    const queryText = await QueryGenerate(prompt);
    console.log("🤖 STEP 2: AI Suggested Programs:", queryText);

    let queryList;
    try {
        queryList = JSON.parse(queryText);
    } catch (e) {
        console.error("❌ PARSE ERROR: AI returned invalid JSON. Trying to clean...");
        const cleaned = queryText.replace(/```json|```/g, "").trim();
        queryList = JSON.parse(cleaned);
    }
    console.log("📋 STEP 3: Parsed Query List:", queryList);

    // 2. Query MongoDB
    const results = await Promise.all(
      queryList.map(async (query: string) => {
        const res = await getSearchResults(query);
        console.log(`🔍 Searching DB for "${query}"... Found: ${res?.length || 0} docs`);
        return res;
      })
    );

    // 3. Flatten
    const responseData = results.flat().filter(Boolean);
    console.log("📊 STEP 4: Total flattened results from DB:", responseData.length);
    
    if (responseData.length > 0) {
        console.log("✅ SAMPLE DATA:", JSON.stringify(responseData[0]).substring(0, 100));
    } else {
        console.warn("⚠️ WARNING: Database returned ZERO results for all suggested programs.");
    }

    // 4. Final AI Response
    const finalResponse = await GenerateResponse(JSON.stringify(responseData));
    console.log("🏁 STEP 5: Final AI Output Generated.");

    return NextResponse.json({ status: 200, finalResponse });
  } catch (error: any) {
    console.error("💥 CRITICAL ROUTE ERROR:", error);
    return NextResponse.json({ status: 500, error: error.message });
  }
}