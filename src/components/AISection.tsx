import { ArrowRight, Sparkles } from "lucide-react";
import PrimaryButton from "./PrimaryButton";
import Link from "next/link";

export default function AISection() {
  return (
    <div className="w-full h-20 flex items-center justify-center space-x-3 pl-2 bg-primary/5 backdrop-blur-md shadow-inner shadow-primary/10">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium">
        <Sparkles size={14} />
        <span>AI-Powered Discovery</span>
      </div>
      <h1 className="">Find the best free-and-open-source software using AI</h1>
      <Link href={`/aifinder`}><PrimaryButton className="h-8 pl-3 pr-3 pt-1 pb-1 flex items-center justify-center"><ArrowRight className="w-5 h-5"/> AI Finder</PrimaryButton></Link>
    </div>
  );
}
