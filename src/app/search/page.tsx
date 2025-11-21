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
  
  // 1. Text Search (MongoDB Native)
  let textResults: any[] = [];
  try {
    textResults = await Program.find(
      { $text: { $search: query } },
      { score: { $meta: "textScore" } }
    ).sort({ score: { $meta: "textScore" } });
  } catch (error) {
    console.warn("Text search failed (likely missing index), falling back to regex:", error);
    // Continue with empty textResults
  }

  // 2. Fuzzy Regex Search
  // Handles "photo shop" -> "photoshop" by removing spaces
  // Also handles partial matches like "photo"
  const cleanQuery = query.replace(/[^a-zA-Z0-9]/g, "");
  const fuzzyRegex = new RegExp(cleanQuery.split('').join('.*'), 'i'); // "ps" -> /p.*s/i (very fuzzy) - maybe too fuzzy?
  // Let's stick to the user's request: "photo shop" -> "photoshop"
  // So we check if the stripped query exists in the stripped target fields? 
  // Or just standard regex with the original query and a "stripped" version.
  
  const strippedQuery = query.replace(/\s+/g, ""); // "photo shop" -> "photoshop"
  const fuzzyRegex2 = new RegExp(strippedQuery, 'i');

  const regexResults = await Program.find({
    $or: [
      { name: { $regex: fuzzyRegex2 } },
      { alternativesTo: { $in: [fuzzyRegex2] } },
      // Keep original broad regex too for partials
      { name: { $regex: new RegExp(query, 'i') } },
      { alternativesTo: { $in: [new RegExp(query, 'i')] } }
    ]
  });

  // Combine and deduplicate results
  const allResults = [...textResults, ...regexResults];
  const uniqueResults = Array.from(new Map(allResults.map(item => [item._id.toString(), item])).values());
  
  return uniqueResults;
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
              Found {programs.length} result{programs.length !== 1 ? 's' : ''} for "<span className="text-foreground font-medium">{query}</span>"
            </p>
          ) : (
            <p className="text-muted-foreground">
              Please enter a search term to find alternatives.
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
            <p className="text-xl text-muted-foreground mb-4">No alternatives found.</p>
            <p className="text-sm text-muted-foreground/60">
              Try searching for a different term or browse the <Link href="/" className="text-primary hover:underline">popular list</Link>.
            </p>
          </div>
        ) : null}
      </div>
    </main>
  );
}
