/***********
 * /api/search
 *
 * Params:
 * query: Term to search for
 ***********/

import connectDB from "@/lib/db";
import Program from "@/models/Program";
import { NextRequest, NextResponse } from "next/server";

async function getSearchResults(query: string) {
  await connectDB();

  if (!query.trim()) return [];

  // Variants of query for better fuzzy matching
  const stripped = query.replace(/\s+/g, ""); // "photo shop" → "photoshop"
  const terms = query
    .trim()
    .split(/\s+/)
    .filter((t) => t.length > 0);

  let atlasResults: any[] = [];

  try {
    // Construct the "AND" clause for the original terms
    const andClause = {
      compound: {
        must: terms.map((term) => ({
          text: {
            query: term,
            path: "name",
            fuzzy: {
              maxEdits: 2,
              prefixLength: 2,
            },
          },
        })),
      },
    };

    atlasResults = await Program.aggregate([
      {
        $search: {
          compound: {
            should: [
              andClause,
              {
                text: {
                  query: stripped,
                  path: "name",
                  fuzzy: {
                    maxEdits: 2,
                    prefixLength: 2,
                  },
                },
              },
            ],
            minimumShouldMatch: 1,
          },
        },
      },
      { $limit: 50 },
    ]);
  } catch (err) {
    console.warn("Atlas Search failed. Falling back to regex:", err);
  }

  // If Atlas Search works, return results immediately
  return atlasResults;
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
        return res || null;
      } catch (err) {
        console.error("Error fetching search result for:", query, err);
        return null;
      }
    })
  );

  const response = responses.filter(Boolean);

  if (response.length === 0) {
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }

  return NextResponse.json(response);
}
