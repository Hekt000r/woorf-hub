import Link from "next/link";
import connectDB from "@/lib/db";
import Program from "@/models/Program";
import ProgramCard from "@/components/ProgramCard";
import SearchSection from "@/components/SearchSection";

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

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
  if (atlasResults.length > 0) return atlasResults;

  // -------------------------------
  // 2. Fallback REGEX search
  // -------------------------------
  const fuzzy = new RegExp(stripped.split("").join(".*"), "i");

  const regexes = [
    new RegExp(query, "i"),
    new RegExp(stripped, "i"),
    fuzzy
  ];

  const conditions = regexes.map(regex => ({
    $or: [
      { name: { $regex: regex } },
      { alternativesTo: { $regex: regex } },
      { alternativesTo: { $in: [regex] } },
    ]
  }));

  const regexResults = await Program.find({ $or: conditions });

  // Dedupe
  const unique = Array.from(
    new Map(regexResults.map(p => [p._id.toString(), p])).values()
  );

  return unique;
}


export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = q || "";
  const programs = query ? await getSearchResults(query) : [];

  return (
    <main className="min-h-screen bg-background selection:bg-primary/20 selection:text-primary pt-24">
      <div className="container mx-auto px-4 py-8">
        <SearchSection />

        <div className="mt-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Search Results
          </h1>
          {query ? (
            <p className="text-muted-foreground">
              Found {programs.length} result{programs.length !== 1 ? "s" : ""}{" "}
              for "<span className="text-foreground font-medium">{query}</span>"
            </p>
          ) : (
            <p className="text-muted-foreground">
              Please enter a search term.
            </p>
          )}
        </div>

        {programs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {programs.map((program) => (
              <ProgramCard key={program._id.toString()} program={program} />
            ))}
          </div>
        ) : query ? (
          <div className="text-center py-20 bg-muted/10 rounded-2xl border border-white/5 mt-8">
            <p className="text-xl text-muted-foreground mb-4">
              No alternatives found.
            </p>
            <p className="text-sm text-muted-foreground/60">
              Try searching for a different term or browse the{" "}
              <Link href="/" className="text-primary hover:underline">
                popular list
              </Link>
              .
            </p>
          </div>
        ) : null}
      </div>
    </main>
  );
}
