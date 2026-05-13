"use client";

import { useState } from "react";
import { useResumeStore } from "@/store/useResumeStore";
import { User, Mail, Phone, MapPin, Globe, FileText, UserCircle, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function PersonalInfoForm() {
  const { data, updatePersonalInfo } = useResumeStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    updatePersonalInfo({ [e.target.name]: e.target.value });
  };

  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateSummary = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "generate_summary",
          data: data.personalInfo,
        }),
      });
      const result = await response.json();
      if (result.text) {
        updatePersonalInfo({ summary: result.text.trim() });
      } else if (result.error) {
        alert(result.error);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to generate summary");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-8 pb-12 text-zinc-100">
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-purple-500/10 rounded-xl border border-purple-500/20">
          <UserCircle className="w-6 h-6 text-purple-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Personal Information</h2>
          <p className="text-sm text-zinc-500 mt-1">Start with the basics to let employers know who you are.</p>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-8 bg-zinc-900/40 border border-zinc-800/60 rounded-[2rem] shadow-2xl backdrop-blur-md"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          <div className="space-y-2.5">
            <label className="flex items-center gap-2 text-sm font-medium text-zinc-400">
              <User className="w-4 h-4 text-purple-400" />
              Full Name
            </label>
            <input
              name="fullName"
              value={data.personalInfo.fullName}
              onChange={handleChange}
              className="w-full px-5 py-3.5 rounded-2xl border border-zinc-800 bg-zinc-950/50 focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all placeholder:text-zinc-700"
              placeholder="John Doe"
            />
          </div>
          
          <div className="space-y-2.5">
            <label className="flex items-center gap-2 text-sm font-medium text-zinc-400">
              <Mail className="w-4 h-4 text-blue-400" />
              Email Address
            </label>
            <input
              name="email"
              value={data.personalInfo.email}
              onChange={handleChange}
              className="w-full px-5 py-3.5 rounded-2xl border border-zinc-800 bg-zinc-950/50 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder:text-zinc-700"
              placeholder="john@example.com"
            />
          </div>

          <div className="space-y-2.5">
            <label className="flex items-center gap-2 text-sm font-medium text-zinc-400">
              <Phone className="w-4 h-4 text-emerald-400" />
              Phone Number
            </label>
            <input
              name="phone"
              value={data.personalInfo.phone}
              onChange={handleChange}
              className="w-full px-5 py-3.5 rounded-2xl border border-zinc-800 bg-zinc-950/50 focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all placeholder:text-zinc-700"
              placeholder="+1 234 567 890"
            />
          </div>

          <div className="space-y-2.5">
            <label className="flex items-center gap-2 text-sm font-medium text-zinc-400">
              <MapPin className="w-4 h-4 text-pink-400" />
              Location
            </label>
            <input
              name="location"
              value={data.personalInfo.location}
              onChange={handleChange}
              className="w-full px-5 py-3.5 rounded-2xl border border-zinc-800 bg-zinc-950/50 focus:border-pink-500/50 focus:ring-4 focus:ring-pink-500/10 outline-none transition-all placeholder:text-zinc-700"
              placeholder="New York, NY"
            />
          </div>

          <div className="space-y-2.5 md:col-span-2">
            <label className="flex items-center gap-2 text-sm font-medium text-zinc-400">
              <Globe className="w-4 h-4 text-indigo-400" />
              Website / LinkedIn / GitHub
            </label>
            <input
              name="website"
              value={data.personalInfo.website}
              onChange={handleChange}
              className="w-full px-5 py-3.5 rounded-2xl border border-zinc-800 bg-zinc-950/50 focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all placeholder:text-zinc-700"
              placeholder="https://linkedin.com/in/johndoe"
            />
          </div>

          <div className="space-y-2.5 md:col-span-2">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm font-medium text-zinc-400">
                <FileText className="w-4 h-4 text-amber-400" />
                Professional Summary
              </label>
              <button
                type="button"
                onClick={handleGenerateSummary}
                disabled={isGenerating}
                className="flex items-center gap-2 text-xs bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 px-3 py-1.5 rounded-lg border border-amber-500/20 transition-colors disabled:opacity-50"
              >
                <Sparkles className="w-3 h-3" />
                {isGenerating ? "Generating..." : "AI Generate"}
              </button>
            </div>
            <textarea
              name="summary"
              value={data.personalInfo.summary}
              onChange={handleChange}
              rows={5}
              className="w-full px-5 py-3.5 rounded-2xl border border-zinc-800 bg-zinc-950/50 focus:border-amber-500/50 focus:ring-4 focus:ring-amber-500/10 outline-none transition-all resize-none placeholder:text-zinc-700"
              placeholder="A brief overview of your professional background, skills, and goals..."
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
