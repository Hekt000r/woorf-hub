import Link from "next/link";
import Image from "next/image";
import { IProgram } from "@/models/Program";

interface ProgramCardProps {
  program: IProgram;
}

export default function ProgramCard({ program }: ProgramCardProps) {
  return (
    <Link 
      href={`/program/${program._id}`}
      className="group relative bg-card border border-border rounded-2xl p-6 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 block"
    >
      <div className="flex flex-col h-full">
        <div className="flex items-start justify-between mb-6">
          <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-white/5 p-2 border border-white/10">
            <Image
              src={program.image}
              alt={program.name}
              fill
              className="object-contain p-1"
            />
          </div>
          <div className="p-2 rounded-full bg-muted group-hover:bg-primary/10 group-hover:text-primary transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-external-link"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          </div>
        </div>
        
        <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
          {program.name}
        </h3>
        
        <p className="text-muted-foreground mb-6 line-clamp-3 flex-grow text-sm leading-relaxed">
          {program.description}
        </p>

        <div className="mb-4">
          {program.alternativesTo && program.alternativesTo.length > 0 && (
            <div className="text-xs text-muted-foreground mb-2">
              <span className="font-medium text-foreground">Alternative to:</span> {program.alternativesTo.join(", ")}
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2 mt-auto">
          {program.tags.map((tag) => (
            <span 
              key={tag} 
              className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
