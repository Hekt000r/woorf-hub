/***********
 * /api/AI-Tool-DBSearch/route.ts
 ***********/

import connectDB from "@/lib/db";
import Program from "@/models/Program";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose"; // 1. Added this import

export async function getSearchResults(query: string) {
  // Ensure we are connected
  await connectDB();
  
  // 2. Safe debugging - use optional chaining (?.) to prevent "undefined" crashes
  const dbName = mongoose.connection?.name || "Unknown DB";
  const colName = Program.collection.name;
  
  // This is the most important log for your demo!
  let totalInDb = 0;
  try {
    totalInDb = await Program.countDocuments();
  } catch (e) {
    console.error("Failed to count documents:", e);
  }
  
  console.log(`--- DB DEBUG ---`);
  console.log(`Connected to: [${dbName}]`);
  console.log(`Collection: [${colName}]`);
  console.log(`Total Docs in DB: ${totalInDb}`);
  console.log(`Searching for: "${query}"`);

  if (!query.trim()) return [];

  // 3. REGEX FALLBACK (Safest for demo)
  const results = await Program.find({ 
    name: { $regex: new RegExp(query.trim(), 'i') } 
  }).limit(3).lean();

  console.log(`Matches for "${query}": ${results.length}`);
  return results;
}

export async function POST(req: NextRequest) {
  let queryList: string[];

  try {
    const body = await req.json();
    if (!body || !Array.isArray(body)) {
      return NextResponse.json({ error: "queryList must be an array" }, { status: 400 });
    }
    queryList = body;
  } catch (err) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Process each query safely
  const responses = await Promise.all(
    queryList.map(async (query) => {
      try {
        const res = await getSearchResults(query);
        return res || []; // Return empty array instead of null for better flattening
      } catch (err) {
        console.error("Error fetching search result for:", query, err);
        return [];
      }
    })
  );

  // 4. Flatten the results so it's a clean list of program objects
  const response = responses.flat().filter(Boolean);

  console.log(`--- FINAL POST RESPONSE: Sending ${response.length} items to AI ---`);

  if (response.length === 0) {
    // If you want to avoid a 404 error during the demo, return an empty 200 instead
    return NextResponse.json({ error: "Not Found", data: [] }, { status: 404 });
  }

  return NextResponse.json(response);
}