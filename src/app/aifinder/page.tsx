"use client";

import { useState } from "react";
import {
  WandSparkles,
  ArrowRight,
  Sparkles,
  SendHorizonal,
} from "lucide-react";
import PrimaryButton from "@/components/PrimaryButton";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import "@/../public/markdown.css"

export default function AIFinderPage() {
  const [query, setQuery] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [response, setResponse] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!query.trim()) return;

    setIsGenerating(true);

    const axiosRes = await axios.get(`/api/AI-find?prompt=${query}`);

    setResponse(axiosRes.data.finalResponse);

    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-3xl relative z-10 flex flex-col gap-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium">
            <Sparkles size={14} />
            <span>AI-Powered Discovery</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Find software with{" "}
            <span className="text-gradient">Intelligence</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Describe what you need in plain English, and let our AI find the
            perfect open-source alternative for you.
          </p>
        </div>

        {/* Input Area */}
        <div className="glass-panel rounded-full p-1.5  flex flex-row items-center  gap-2 shadow-2xl shadow-blue-900/20">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. 'I need a free alternative to Photoshop for editing photos on Linux...'"
            className="flex-1 bg-transparent border-none outline-none px-4 py-3 h-12 placeholder:text-muted-foreground/50 text-foreground"
            onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
          />

          {/* 

          button

          if no query, then disabled
          if already generating, then disabled

          else enabled
          */}
          <button
            disabled={!query || isGenerating}
            onClick={handleGenerate}
            className={`rounded-full flex items-center justify-center
            cursor-pointer text-primary-foreground
            w-10 h-10 mr-2 bg-primary
            shadow-lg shadow-primary/30
            disabled:opacity-50 disabled:cursor-default

            ${
              !query || isGenerating
                ? ""
                : `              transition-all duration-200
  hover:opacity-90 hover:scale-105
  active:translate-y-0 active:scale-90`
            } `}
          >
            {!isGenerating ? (
              <>
                <SendHorizonal />
              </>
            ) : (
              <>
                <WandSparkles />
              </>
            )}
          </button>
        </div>

        {/* Results Area (Placeholder) */}
        {response && (
          <div className="glass-panel rounded-2xl p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
                <WandSparkles size={24} />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">AI Recommendation</h3>
                
                <div className="text-muted-foreground leading-relaxed prose prose-indigo dark:prose-invert markdown">
                  <ReactMarkdown>{response}</ReactMarkdown>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Empty State / Suggestions */}
        {!response && !isGenerating && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 opacity-60">
            {[
              "Video editor like Premiere",
              "Privacy-focused Google Chrome alternatives",
              "Alternatives to Adobe Photoshop",
            ].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => setQuery(suggestion)}
                className="p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors text-sm text-muted-foreground hover:text-foreground text-left"
              >
                "{suggestion}"
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
