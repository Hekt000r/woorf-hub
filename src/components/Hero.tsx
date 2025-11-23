import Link from "next/link";
import PrimaryButton from "./PrimaryButton";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-28">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] hero-glow opacity-100 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          <span className="text-sm font-medium text-muted-foreground">
            The New Home for Open Source
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
          Discover the Best <br />
          <span className="text-gradient">Open Source Software</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          Woorf is the community-driven hub for finding, sharing, and supporting
          the best FOSS alternatives and tools.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="#categories"
            className=""
          >
            <PrimaryButton className="h-12">Explore Apps</PrimaryButton>
            
          </Link>
          <Link
            href="https://github.com"
            target="_blank"
            className="h-12 px-8 rounded-full bg-white/5 border border-white/10 text-foreground font-medium flex items-center justify-center hover:bg-white/10 transition-colors w-full sm:w-auto backdrop-blur-sm"
          >
            Contribute
          </Link>
        </div>
      </div>
    </section>
  );
}
