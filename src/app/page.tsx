import Hero from "@/components/Hero";
import SearchSection from "@/components/SearchSection";
import ProgramList from "@/components/ProgramList";
import CategorySection from "@/components/CategorySection";
import connectDB from "@/lib/db";
import Program from "@/models/Program";
import RegularSearch from "@/components/RegularSearch";

async function getPrograms() {
  await connectDB();
  const programs = await Program.find({});
  return programs;
}

export default async function Home() {
  const programs = await getPrograms();

  return (
    <main className="min-h-screen bg-background selection:bg-primary/20 selection:text-primary">

      <Hero />
      <SearchSection />
      <CategorySection programs={JSON.parse(JSON.stringify(programs))} />
      <ProgramList />
      <RegularSearch/>
      
      <footer className="py-12 border-t border-border bg-muted/20">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} Woorf. Open Source Software Hub.</p>
        </div>
      </footer>
    </main>
  );
}
