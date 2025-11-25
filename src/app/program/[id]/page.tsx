import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Program from "@/models/Program";
import connectDB from "@/lib/db";
import Navbar from "@/components/Navbar";
import PrimaryButton from "@/components/PrimaryButton";
import ProgramCard from "@/components/ProgramCard";

interface ProgramPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProgramPage({ params }: ProgramPageProps) {
  const { id } = await params;
  await connectDB();
  
  let program;
  try {
    program = await Program.findById(id);
  } catch (error) {
    console.error("Error fetching program:", error);
    notFound();
  }

  if (!program) {
    notFound();
  }

  // Fetch similar programs (same category, excluding current program)
  const similarPrograms = await Program.find({
    "tags.0": program.tags[0],
    _id: { $ne: program._id }
  }).limit(6);

  return (
    <main className="min-h-screen bg-background text-foreground pt-20">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-card border border-border rounded-3xl p-8 md:p-12 shadow-xl">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Icon */}
            <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden bg-white/5 p-4 border border-white/10 flex-shrink-0 mx-auto md:mx-0">
              <Image
                src={program.image}
                alt={program.name}
                fill
                className="object-contain p-2"
                priority
              />
            </div>

            {/* Content */}
            <div className="flex-grow w-full text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{program.name}</h1>
              
              <div className="flex flex-wrap gap-2 mb-6 justify-center md:justify-start">
                {program.tags.map((tag: string) => (
                  <span 
                    key={tag} 
                    className="text-sm font-medium px-3 py-1.5 rounded-full bg-primary/10 text-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                {program.description}
              </p>

              {program.alternativesTo && program.alternativesTo.length > 0 && (
                <div className="mb-8 p-4 rounded-xl bg-muted/50 border border-border max-w-fit mx-auto md:mx-0">
                  <h3 className="text-sm font-semibold text-foreground mb-2">Good alternative to:</h3>
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    {program.alternativesTo.map((alt: string) => (
                      <span key={alt} className="text-sm text-muted-foreground bg-background px-2 py-1 rounded border border-border">
                        {alt}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link 
                  href={program.link}
                  target="_blank"
                  className=""
                >
                  <PrimaryButton className="h-12">Visit Official Site <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg></PrimaryButton>
                  
                </Link>
                
                <Link 
                  href="/"
                  className="inline-flex items-center justify-center px-8 py-3 rounded-full border border-border bg-transparent text-foreground font-semibold hover:bg-muted/50 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Programs Section */}
      {similarPrograms.length > 0 && (
        <div className="container mx-auto px-4 py-12 max-w-6xl border-t border-border">
          <h2 className="text-3xl font-bold mb-8 text-center">Similar Programs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarPrograms.map((similar) => (
              <ProgramCard key={similar._id.toString()} program={similar} />
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
