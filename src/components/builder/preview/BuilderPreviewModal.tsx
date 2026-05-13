"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, FileText, Globe, Download } from "lucide-react";
import ResumePreview from "./ResumePreview";
import PortfolioPreview from "./PortfolioPreview";
import { RefObject } from "react";

interface BuilderPreviewModalProps {
  mode: "resume" | "portfolio" | null;
  onClose: () => void;
  setMode: (mode: "resume" | "portfolio") => void;
  selectedTemplate: string;
  setSelectedTemplate: (template: string) => void;
  handleDownload: () => void;
  handleDownloadWord: () => void;
  isGenerating: boolean;
  resumeRef: RefObject<HTMLDivElement | null>;
}

export default function BuilderPreviewModal({
  mode,
  onClose,
  setMode,
  selectedTemplate,
  setSelectedTemplate,
  handleDownload,
  handleDownloadWord,
  isGenerating,
  resumeRef,
}: BuilderPreviewModalProps) {
  if (!mode) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 lg:p-8 print:static print:bg-transparent print:p-0 print:block">
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white dark:bg-zinc-950 w-full max-w-6xl h-full max-h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-zinc-200 dark:border-zinc-800 print:shadow-none print:border-none print:max-w-none print:max-h-none print:h-auto print:rounded-none print:block print:overflow-visible"
      >
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center bg-zinc-50 dark:bg-zinc-900 print:hidden">
          <div className="flex gap-2">
            <button 
              onClick={() => setMode("resume")}
              className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${mode === 'resume' ? 'bg-white dark:bg-zinc-800 shadow-sm border border-zinc-200 dark:border-zinc-700' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100'}`}
            >
              <FileText className="w-4 h-4" /> Resume PDF
            </button>
            <button 
              onClick={() => setMode("portfolio")}
              className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${mode === 'portfolio' ? 'bg-white dark:bg-zinc-800 shadow-sm border border-zinc-200 dark:border-zinc-700' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100'}`}
            >
              <Globe className="w-4 h-4" /> Web Portfolio
            </button>
          </div>
          <div className="flex items-center gap-3">
            {mode === "resume" && (
              <>
                <select 
                  value={selectedTemplate} 
                  onChange={(e) => setSelectedTemplate(e.target.value)}
                  className="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-sm rounded-lg px-3 py-2 outline-none text-zinc-900 dark:text-zinc-100"
                >
                  <option value="classic">Classic</option>
                  <option value="modern">Modern</option>
                  <option value="minimal">Minimal</option>
                  <option value="aesthetic">Aesthetic</option>
                  <option value="professional">Professional</option>
                </select>
                <button
                  onClick={handleDownloadWord}
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  <FileText className="w-4 h-4" /> Word
                </button>
                <button
                  onClick={handleDownload}
                  disabled={isGenerating}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                >
                  {isGenerating ? "Generating..." : <><Download className="w-4 h-4" /> PDF</>}
                </button>
              </>
            )}
            <button
              onClick={onClose}
              className="p-2 bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto bg-zinc-100 dark:bg-zinc-950 p-4 lg:p-8 flex justify-center print:bg-transparent print:p-0 print:overflow-visible">
          {mode === "resume" ? (
            <div className="shadow-xl max-w-[210mm] w-full min-h-[297mm] mx-auto p-10 shrink-0 print:shadow-none print:m-0 print:p-0 print:w-auto" style={{ backgroundColor: '#ffffff', color: '#000000' }} ref={resumeRef}>
              <ResumePreview template={selectedTemplate} />
            </div>
          ) : (
            <div className="w-full h-full bg-white dark:bg-zinc-950 rounded-xl overflow-hidden shadow-xl border border-zinc-200 dark:border-zinc-800">
               <PortfolioPreview />
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
