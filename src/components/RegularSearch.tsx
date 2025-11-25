"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PrimaryButton from "./PrimaryButton";

export default function RegularSearch() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <section className="py-12 border-y border-white/5 bg-white/5 backdrop-blur-sm">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">
          Search for a program
        </h2>
        
        <div className="max-w-2xl mx-auto relative">
          <form onSubmit={handleSearch} className="relative flex items-center">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. Gimp, LibreOffice, kdenlive ..."
              className="w-full h-14 pl-6 pr-32 rounded-full bg-black/20 border border-white/10 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none transition-all text-lg placeholder:text-muted-foreground/50"
            />
            <PrimaryButton 
              type="submit"
              className=" absolute right-3 h-10"
            >
              Search
            </PrimaryButton>
          </form>
        </div>
      </div>
    </section>
  );
}
