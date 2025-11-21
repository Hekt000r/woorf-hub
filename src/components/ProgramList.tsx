import connectDB from "@/lib/db";
import Program from "@/models/Program";
import ProgramCard from "./ProgramCard";

async function getPrograms() {
  await connectDB();
  const programs = await Program.find({}).limit(6);
  return programs;
}

export default async function ProgramList() {
  const programs = await getPrograms();

  return (
    <section id="explore" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Popular Alternatives</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore community-favorite open source software that respects your freedom and privacy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program) => (
            <ProgramCard key={program._id.toString()} program={program} />
          ))}
        </div>
      </div>
    </section>
  );
}
