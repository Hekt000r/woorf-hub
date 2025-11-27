/******************
 * /api/AI-find
 *
 * AI Find function, uses AI (GroqCloud) to search for
 * programs fitting to user's input, then searches through
 * woorf database to ensure program is present in DB.
 *
 ******************/

/* Imports */

import { NextRequest, NextResponse } from "next/server";
import { LRUCache } from "lru-cache";
import axios from "axios";
import { groq } from "@ai-sdk/groq";
import { generateText } from "ai";

// config:

// rate-limiter

const limiter = new LRUCache({
  max: 500, // max number of tracked IP's
  ttl: 60 & 1000, // 1 minute
});

// AI API setup

const AI_API_KEY = process.env.WOORF_AI_KEY;

const searchAPIURL = `${
  process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
}/api/AI-Tool-DBSearch`;

// functions

async function QueryGenerate(prompt: string) {
  // Creates an array to be used to query MongoDB
  const response = await generateText({
    model: groq(`llama-3.3-70b-versatile`),
    system: `Find free-and-open-source programs that match the user's request. MAKE SURE they are open-source, and return a javascript array of the programs. Make SURE the array syntax is valid. And do not output anything else other than the array. Do NOT use formatting charactes like /n and backwards slash. Return a maximum of 7 results, but try to get 7 if possible. If possible, make sure all software is cross-platform for Linux, Windows, and MacOS.`,
    prompt: prompt,
  });

  return response.text;
}

async function GenerateResponse(DBInput: string) {
  const response = await generateText({
    model: groq(`llama-3.3-70b-versatile`),
    system: `You are an AI assistant for a website called Woorf, a hub for free-and-open-source software. You are provided with a list of Programs in JSON from a database [from the user's prompt], and you need to finalize the response by searching for more information and formatting the final response. Add links to official websites. Keep your message short and only speak about the programs itself, no need to talk about why FOSS is good. Try and use every entry from the DB. Ignore irrelevant/ unrelated programs`,
    prompt: DBInput,
  });

  return response.text
}

export async function GET(req: NextRequest) {
  const prompt = req.nextUrl.searchParams.get("prompt");

  if (!prompt)
    return NextResponse.json({ status: 403, error: "No prompt provided" });

  // Step 1.: QueryGenerate an array of programs to search in MongoDB

  const queryText = await QueryGenerate(prompt);

  // Step 2.: Query MongoDB and search for programs
  const response = await axios.post(searchAPIURL, JSON.parse(queryText));
  const responseData = response.data;

  // Step 3.: Generate final response with links from MongoDB
  console.table(responseData);

  const finalResponse = await GenerateResponse(JSON.stringify(responseData, null, 2));


  return NextResponse.json({ status: 200, finalResponse });
}
