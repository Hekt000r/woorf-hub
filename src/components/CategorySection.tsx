"use client";

import { useState } from "react";
import { 
  FileText, Palette, Box, Video, Headphones, 
  MessageSquare, Database, Code, Monitor, Lock, 
  Globe, PieChart, Gamepad2, StickyNote, Settings,
  LucideIcon
} from "lucide-react";
import ProgramCard from "./ProgramCard";
import { IProgram } from "@/models/Program";

interface CategorySectionProps {
  programs: IProgram[];
}

// Map category names to icons
const getCategoryIcon = (category: string): LucideIcon => {
  const iconMap: Record<string, LucideIcon> = {
    "Office": FileText,
    "Productivity": Settings,
    "Design": Palette,
    "Graphics": Palette,
    "3D": Box,
    "Animation": Video,
    "Audio": Headphones,
    "Video": Video,
    "Communication": MessageSquare,
    "Collaboration": MessageSquare,
    "Development": Code,
    "Database": Database,
    "Operating System": Monitor,
    "Security": Lock,
    "Privacy": Lock,
    "Browser": Globe,
    "Analytics": PieChart,
    "Game Development": Gamepad2,
    "Note-Taking": StickyNote,
    "Editing": Video,
    "Recording": Headphones,
    "Player": Video,
    "Image Editor": Palette,
    "Vector": Palette,
    "Painting": Palette,
    "Art": Palette,
    "Modeling": Box,
  };
  
  return iconMap[category] || Settings;
};

export default function CategorySection({ programs }: CategorySectionProps) {
  // Group programs by their first tag (primary category)
  const categorizedPrograms: Record<string, IProgram[]> = {};
  
  programs.forEach((program) => {
    const primaryTag = program.tags[0];
    if (!categorizedPrograms[primaryTag]) {
      categorizedPrograms[primaryTag] = [];
    }
    categorizedPrograms[primaryTag].push(program);
  });

  // Sort categories alphabetically
  const categories = Object.keys(categorizedPrograms).sort();
  
  // State for selected category
  const [selectedCategory, setSelectedCategory] = useState(categories[0] || "");

  if (categories.length === 0) return null;

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Browse by Category</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover open source software organized by categories
          </p>
        </div>

        {/* Horizontal category tabs */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => {
              const Icon = getCategoryIcon(category);
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-5 py-3 rounded-2xl font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-2 border-2 cursor-pointer ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30 border-primary scale-105"
                      : "bg-card text-foreground border-border hover:border-primary/50 hover:bg-muted/50 hover:scale-105"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{category}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    selectedCategory === category
                      ? "bg-primary-foreground/20"
                      : "bg-muted"
                  }`}>
                    {categorizedPrograms[category].length}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Display programs for selected category */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categorizedPrograms[selectedCategory]?.map((program) => (
            <ProgramCard key={program._id.toString()} program={program} />
          ))}
        </div>
      </div>
    </section>
  );
}
