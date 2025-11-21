import Hero from "@/components/Hero";
import SearchSection from "@/components/SearchSection";
import ProgramList from "@/components/ProgramList";

export default function Home() {
  return (
    <main className="min-h-screen bg-background selection:bg-primary/20 selection:text-primary">

      <Hero />
      <SearchSection />
      <ProgramList />
      
      <footer className="py-12 border-t border-border bg-muted/20">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} Woorf. Open Source Software Hub.</p>
        </div>
      </footer>
    </main>
  );
}
