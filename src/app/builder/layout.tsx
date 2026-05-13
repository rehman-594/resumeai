"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Pencil, Layout as LayoutIcon, Eye, Download, Percent
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

const TOP_NAV = [
  { id: "create", label: "Create", icon: Pencil, href: "/builder" },
  { id: "templates", label: "Templates", icon: LayoutIcon, href: "/builder/templates" },
  { id: "preview", label: "Preview", icon: Eye, href: "/builder/preview" },
  { id: "export", label: "Export", icon: Download, href: "/builder/export" },
];

export default function BuilderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex h-screen bg-zinc-950 items-center justify-center">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 border-4 border-purple-500/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-t-purple-500 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  const isActive = (href: string) => {
    if (href === "/builder") return pathname === "/builder";
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-purple-500/30">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 w-full border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-xl">
        <div className="max-w-[1400px] mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-600/20 group-hover:scale-110 transition-transform">
              <Percent className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              ResumeAI
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1 bg-zinc-900/50 p-1.5 rounded-2xl border border-zinc-800/50">
            {TOP_NAV.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    active 
                      ? "bg-zinc-800 text-white shadow-sm" 
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                  }`}
                >
                  <item.icon className={`w-4 h-4 ${active ? "text-purple-400" : ""}`} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-600 to-blue-600 border-2 border-zinc-800"></div>
          </div>

        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-6 py-8">
        {children}
      </main>


      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-6 left-6 right-6 z-50 bg-zinc-900/90 backdrop-blur-xl border border-zinc-800 rounded-3xl p-2 flex items-center justify-around shadow-2xl">
        {TOP_NAV.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`p-4 rounded-2xl transition-all ${
                active ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30" : "text-zinc-500"
              }`}
            >
              <item.icon className="w-6 h-6" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
