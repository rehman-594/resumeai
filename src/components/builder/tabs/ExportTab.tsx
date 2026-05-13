"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Download, Check } from "lucide-react";
import ResumePreview from "../preview/ResumePreview";
import { useResumeExport } from "@/hooks/useResumeExport";
import { useResumeStore } from "@/store/useResumeStore";

export default function ExportTab() {
  const resumeRef = useRef<HTMLDivElement>(null);
  const { selectedTemplate } = useResumeStore();
  const { handleDownloadPDF, handleDownloadWord } = useResumeExport(resumeRef);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-5xl mx-auto py-16 px-6"
    >
      <div className="text-center mb-16 space-y-4">
        <div className="flex items-center justify-center gap-4 mb-4">
          <Download className="w-10 h-10 text-purple-500 fill-purple-500/20" />
          <h2 className="text-5xl font-bold tracking-tight text-white">Download Your Resume</h2>
        </div>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto font-medium">
          Choose your preferred format and download your professional resume
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* PDF Format */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-12 rounded-[2.5rem] bg-[#121214] border border-zinc-800/50 flex flex-col items-center text-center group hover:border-zinc-700 transition-all duration-300 shadow-2xl"
        >
          <div className="w-24 h-24 bg-red-500/10 rounded-3xl flex items-center justify-center mb-8">
            <div className="w-16 h-16 bg-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-600/20">
              <span className="text-white font-black text-xl">PDF</span>
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-4 text-white">PDF Format</h3>
          <p className="text-zinc-500 mb-10 text-sm leading-relaxed font-medium px-4">
            Best for job applications, email attachments, and printing. Preserves formatting across all devices.
          </p>
          <div className="space-y-4 mb-12 w-full max-w-[180px] mx-auto">
            <div className="flex items-center gap-3 text-zinc-400 text-sm font-medium">
              <Check className="w-4 h-4 text-emerald-500 stroke-[3]" /> ATS Compatible
            </div>
            <div className="flex items-center gap-3 text-zinc-400 text-sm font-medium">
              <Check className="w-4 h-4 text-emerald-500 stroke-[3]" /> Print Ready
            </div>
            <div className="flex items-center gap-3 text-zinc-400 text-sm font-medium">
              <Check className="w-4 h-4 text-emerald-500 stroke-[3]" /> Universal Format
            </div>
          </div>
          <button 
            onClick={handleDownloadPDF}
            className="w-full py-4 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-bold flex items-center justify-center gap-3 shadow-lg shadow-red-600/20 transition-all active:scale-95"
          >
            <Download className="w-5 h-5" />
            Download PDF
          </button>
        </motion.div>

        {/* Word Format */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-12 rounded-[2.5rem] bg-[#121214] border border-zinc-800/50 flex flex-col items-center text-center group hover:border-zinc-700 transition-all duration-300 shadow-2xl"
        >
          <div className="w-24 h-24 bg-blue-500/10 rounded-3xl flex items-center justify-center mb-8">
            <div className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
              <span className="text-white font-black text-xl">W</span>
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-4 text-white">DOCX Format</h3>
          <p className="text-zinc-500 mb-10 text-sm leading-relaxed font-medium px-4">
            Editable in Microsoft Word and Google Docs. Perfect for further customization and sharing.
          </p>
          <div className="space-y-4 mb-12 w-full max-w-[180px] mx-auto">
            <div className="flex items-center gap-3 text-zinc-400 text-sm font-medium">
              <Check className="w-4 h-4 text-emerald-500 stroke-[3]" /> Fully Editable
            </div>
            <div className="flex items-center gap-3 text-zinc-400 text-sm font-medium">
              <Check className="w-4 h-4 text-emerald-500 stroke-[3]" /> Word Compatible
            </div>
            <div className="flex items-center gap-3 text-zinc-400 text-sm font-medium">
              <Check className="w-4 h-4 text-emerald-500 stroke-[3]" /> Easy to Modify
            </div>
          </div>
          <button 
            onClick={handleDownloadWord}
            className="w-full py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl font-bold flex items-center justify-center gap-3 shadow-lg shadow-blue-600/20 transition-all active:scale-95"
          >
            <Download className="w-5 h-5" />
            Download DOCX
          </button>
        </motion.div>
      </div>

      {/* Off-screen Resume for Export */}
      <div className="fixed -left-[9999px] top-0 pointer-events-none" aria-hidden="true">
        <div 
          ref={resumeRef} 
          className="w-[210mm] bg-white text-black p-10 min-h-[297mm]"
          style={{ fontFamily: 'Arial, sans-serif' }}
        >
          <ResumePreview template={selectedTemplate} />
        </div>
      </div>
    </motion.div>
  );
}

