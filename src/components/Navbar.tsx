"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, Info } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/search" && pathname.startsWith("/program/")) {
      return true;
    }
    return pathname === path;
  };

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Explore", path: "/search", icon: Search },
    { name: "About", path: "/about", icon: Info },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-3xl tracking-tight">
          woorf<span className="text-primary">.</span>
        </Link>
        <div className="flex items-center gap-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-200 text-sm font-medium ${
                  active
                    ? "bg-primary/10 text-primary border-primary/20"
                    : "text-muted-foreground hover:text-foreground border-transparent hover:bg-white/5 hover:border-white/10"
                }`}
              >
                <Icon size={16} />
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
