"use client";

import { useResumeStore } from "@/store/useResumeStore";
import { Globe, Monitor, Smartphone, Layout } from "lucide-react";

export default function PortfolioPreview() {
  const { data } = useResumeStore();

  return (
    <div className="w-full h-full bg-zinc-950 flex flex-col items-center justify-center p-12 text-center">
      <div className="w-20 h-20 bg-purple-500/10 rounded-3xl flex items-center justify-center border border-purple-500/20 mb-6 animate-pulse">
        <Globe className="w-10 h-10 text-purple-400" />
      </div>
      <h2 className="text-3xl font-bold text-white mb-4">Web Portfolio Preview</h2>
      <p className="text-zinc-400 max-w-md mx-auto mb-10 leading-relaxed">
        Your information is being used to generate a stunning, mobile-responsive personal portfolio website. 
        Select a template below to see how it looks.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-2xl">
        <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl flex flex-col items-center gap-4">
          <Monitor className="w-6 h-6 text-blue-400" />
          <span className="text-sm font-medium text-zinc-300">Desktop Optimized</span>
        </div>
        <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl flex flex-col items-center gap-4">
          <Smartphone className="w-6 h-6 text-emerald-400" />
          <span className="text-sm font-medium text-zinc-300">Mobile Responsive</span>
        </div>
        <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl flex flex-col items-center gap-4">
          <Layout className="w-6 h-6 text-pink-400" />
          <span className="text-sm font-medium text-zinc-300">SEO Ready</span>
        </div>
      </div>

      <div className="mt-12 text-zinc-500 text-sm font-medium flex items-center gap-2">
        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></div>
        Portfolio Generation Active
      </div>
    </div>
  );
}
