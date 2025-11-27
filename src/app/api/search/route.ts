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
  const terms = query.trim().split(/\s+/).filter(t => t.length > 0);

  let atlasResults: any[] = [];

  try {
    // Construct the "AND" clause for the original terms
    const andClause = {
      compound: {
        must: terms.map(term => ({
          text: {
            query: term,
            path: "name",
            fuzzy: {
              maxEdits: 2,
              prefixLength: 2
            }
          }
        }))
      }
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
                    prefixLength: 2
                  }
                }
              }
            ],
            minimumShouldMatch: 1
          }
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


export async function GET(req: NextRequest) {
    const query = req.nextUrl.searchParams.get("query")

    if (!query) {
        return NextResponse.json({ error: "Query is required" }, { status: 403 })
    }

    console.log(query)


    const response = await getSearchResults(query)

    console.log(response)

    if (!response) {
        return NextResponse.json({ error: "Not Found"}, {status: 403})
    }

    return NextResponse.json(response)
}