"use client";

import { useState } from "react";
import { useResumeStore } from "@/store/useResumeStore";
import { Sparkles, X, Activity, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AIReviewPanel() {
  const { data } = useResumeStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [reviewResult, setReviewResult] = useState<string | null>(null);

  const handleReview = async () => {
    setIsGenerating(true);
    setReviewResult(null);
    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "review_resume",
          data,
        }),
      });
      const result = await response.json();
      if (result.text) {
        setReviewResult(result.text.trim());
      } else if (result.error) {
        setReviewResult("Error: " + result.error);
      }
    } catch (error) {
      console.error(error);
      setReviewResult("Failed to get review from AI.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 hover:from-emerald-500/20 hover:to-teal-500/20 border border-emerald-500/20 text-emerald-400 rounded-2xl transition-all shadow-lg hover:shadow-emerald-500/10 font-medium"
      >
        <Sparkles className="w-4 h-4" />
        AI Resume Score & Review
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
            >
              <div className="flex items-center justify-between p-6 border-b border-zinc-800/50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-400">
                    <Activity className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-semibold text-zinc-100">AI Resume Review</h3>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 flex-1 overflow-y-auto">
                {!reviewResult && !isGenerating ? (
                  <div className="text-center py-10 space-y-4">
                    <Sparkles className="w-12 h-12 text-emerald-500/50 mx-auto" />
                    <p className="text-zinc-400">Get an instant ATS score and actionable feedback on how to improve your resume based on your current data.</p>
                    <button
                      onClick={handleReview}
                      className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-medium transition-colors inline-flex items-center gap-2"
                    >
                      <Sparkles className="w-4 h-4" /> Start Review
                    </button>
                  </div>
                ) : isGenerating ? (
                  <div className="flex flex-col items-center justify-center py-16 space-y-4">
                    <div className="w-8 h-8 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin" />
                    <p className="text-emerald-400 font-medium animate-pulse">Analyzing resume data...</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="prose prose-invert prose-emerald max-w-none text-zinc-300 whitespace-pre-wrap text-sm leading-relaxed">
                      {reviewResult}
                    </div>
                    <button
                      onClick={handleReview}
                      className="w-full mt-4 py-2 border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 rounded-xl transition-colors font-medium text-sm"
                    >
                      Re-evaluate
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
