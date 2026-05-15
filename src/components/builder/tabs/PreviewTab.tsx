"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Eye, Smartphone, Monitor, ChevronRight, Layout, Pencil, Sparkles } from "lucide-react";

import ResumePreview from "../preview/ResumePreview";
import { useResumeStore } from "@/store/useResumeStore";

interface PreviewTabProps {
  selectedTemplate: string;
  setSelectedTemplate: (id: string) => void;
  onEdit: () => void;
}

export default function PreviewTab({ selectedTemplate, setSelectedTemplate, onEdit }: PreviewTabProps) {
  const { data } = useResumeStore();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col lg:flex-row gap-10 pb-20"
    >
      {/* Left: Interactive Preview */}
      <div className="flex-1 space-y-6">
        <div className="flex items-center justify-between px-4 py-2 bg-zinc-900/50 border border-zinc-800 rounded-2xl backdrop-blur-xl">
           <div className="flex items-center gap-4">
              <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest px-2">
                 Live Preview
              </span>
           </div>
           
           <button 
              onClick={onEdit}
              className="flex items-center gap-2 text-sm font-bold text-purple-400 hover:text-purple-300 transition-colors"
           >
              <Pencil className="w-4 h-4" />
              Edit Content
           </button>
        </div>

        <motion.div 
           initial={{ opacity: 0, scale: 0.98 }}
           animate={{ opacity: 1, scale: 1 }}
           className="w-full bg-white rounded-2xl shadow-2xl overflow-hidden min-h-[800px] border border-zinc-800/20"
        >
           <div className="w-full h-full p-12 overflow-y-auto max-h-[1200px]">
              <ResumePreview template={selectedTemplate} />
           </div>
        </motion.div>
      </div>

      {/* Right: Quick Settings */}
      <aside className="w-full lg:w-80 space-y-8">
        <div className="p-8 bg-zinc-900/40 border border-zinc-800/60 rounded-[2.5rem] backdrop-blur-md shadow-xl">
           <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-purple-500/10 rounded-xl">
                 <Layout className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="font-bold text-lg text-white">Appearance</h3>
           </div>
           
           <div className="space-y-4">
              <p className="text-sm text-zinc-500 font-medium px-1">Switch Template</p>
              <div className="space-y-2">
                 {["classic", "modern", "minimal", "aesthetic", "professional"].map((id) => (
                    <button
                       key={id}
                       onClick={() => setSelectedTemplate(id)}
                       className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all ${
                          selectedTemplate === id 
                             ? "bg-purple-600/10 border-purple-500/50 text-white" 
                             : "bg-zinc-950/50 border-zinc-800 text-zinc-400 hover:border-zinc-700"
                       }`}
                    >
                       <span className="text-sm font-bold capitalize">{id}</span>
                       {selectedTemplate === id && <div className="w-2 h-2 bg-purple-500 rounded-full shadow-[0_0_8px_rgba(168,85,247,0.5)]" />}
                    </button>
                 ))}
              </div>
           </div>
        </div>

        <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-indigo-600 to-purple-600 border border-white/10 shadow-xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:scale-110 transition-transform">
              <Sparkles className="w-12 h-12 text-white" />
           </div>
           <h4 className="font-black text-xl text-white mb-2 italic">Ready to go?</h4>
           <p className="text-indigo-100 text-sm font-medium mb-6 leading-relaxed">
              Your resume is lookin' sharp. Head over to the export tab to download your professional PDF.
           </p>
           <Link 
             href="/builder/export"
             className="w-full py-4 bg-white text-indigo-600 rounded-2xl font-black text-sm hover:shadow-2xl transition-all active:scale-95 flex items-center justify-center"
           >
              Go to Export
           </Link>

        </div>
      </aside>
    </motion.div>
  );
}

