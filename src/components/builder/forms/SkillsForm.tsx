"use client";

import { useResumeStore } from "@/store/useResumeStore";
import { Award, Code2, Medal, Trophy } from "lucide-react";

import { motion } from "framer-motion";

export default function SkillsForm() {
  const { data, updateData } = useResumeStore();

  return (
    <div className="space-y-8 pb-12 text-zinc-100">
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-pink-500/10 rounded-xl border border-pink-500/20">
          <Award className="w-6 h-6 text-pink-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Skills & Achievements</h2>
          <p className="text-sm text-zinc-500 mt-1">Showcase your technical expertise and notable recognitions.</p>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-8 bg-zinc-900/40 border border-zinc-800/60 rounded-[2rem] shadow-2xl backdrop-blur-md space-y-8"
      >
        <div className="space-y-2.5">
          <label className="flex items-center gap-2 text-sm font-medium text-zinc-400">
            <Code2 className="w-4 h-4 text-blue-400" />
            Skills (comma separated)
          </label>
          <textarea
            value={data.skills}
            onChange={(e) => updateData("skills", e.target.value)}
            rows={4}
            className="w-full px-5 py-3.5 rounded-2xl border border-zinc-800 bg-zinc-950/50 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all resize-none placeholder:text-zinc-700"
            placeholder="JavaScript, React, Node.js, Python..."
          />
        </div>

        <div className="space-y-2.5">
          <label className="flex items-center gap-2 text-sm font-medium text-zinc-400">
            <Medal className="w-4 h-4 text-emerald-400" />
            Certifications (comma or newline separated)
          </label>
          <textarea
            value={data.certifications}
            onChange={(e) => updateData("certifications", e.target.value)}
            rows={4}
            className="w-full px-5 py-3.5 rounded-2xl border border-zinc-800 bg-zinc-950/50 focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all resize-none placeholder:text-zinc-700"
            placeholder="AWS Certified Solutions Architect, Google Data Analytics..."
          />
        </div>

        <div className="space-y-2.5">
          <label className="flex items-center gap-2 text-sm font-medium text-zinc-400">
            <Trophy className="w-4 h-4 text-amber-400" />
            Achievements / Awards (Optional)
          </label>

          <textarea
            value={data.achievements}
            onChange={(e) => updateData("achievements", e.target.value)}
            rows={4}
            className="w-full px-5 py-3.5 rounded-2xl border border-zinc-800 bg-zinc-950/50 focus:border-amber-500/50 focus:ring-4 focus:ring-amber-500/10 outline-none transition-all resize-none placeholder:text-zinc-700"
            placeholder="1st Place Hackathon, Employee of the Month..."
          />
        </div>
      </motion.div>
    </div>
  );
}
