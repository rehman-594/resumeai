"use client";

import { useResumeStore, Experience } from "@/store/useResumeStore";
import { Plus, Trash2, Briefcase, Building2, Calendar, FileText } from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

export default function ExperienceForm() {
  const { data, updateData } = useResumeStore();

  const handleAdd = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      description: "",
    };
    updateData("experience", [...data.experience, newExp]);
  };

  const handleUpdate = (id: string, field: keyof Experience, value: string) => {
    const updated = data.experience.map((exp) =>
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    updateData("experience", updated);
  };

  const handleRemove = (id: string) => {
    const filtered = data.experience.filter((exp) => exp.id !== id);
    updateData("experience", filtered);
  };

  return (
    <div className="space-y-8 pb-12 text-zinc-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-500/10 rounded-xl border border-blue-500/20">
            <Briefcase className="w-6 h-6 text-blue-400" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Work Experience</h2>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-200 px-5 py-2.5 rounded-xl border border-zinc-700/50 transition-all active:scale-95 text-sm font-medium"
        >
          <Plus className="w-4 h-4" /> Add Experience
        </button>
      </div>

      <div className="space-y-10">
        <AnimatePresence mode="popLayout">
          {data.experience.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20 bg-zinc-900/30 border border-zinc-800/50 rounded-3xl backdrop-blur-sm"
            >
              <div className="w-16 h-16 bg-zinc-800/50 rounded-full flex items-center justify-center mx-auto mb-4 border border-zinc-700/30">
                <Briefcase className="w-8 h-8 text-zinc-500" />
              </div>
              <p className="text-zinc-400 font-medium">No experience added yet.</p>
              <button
                onClick={handleAdd}
                className="mt-4 text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium"
              >
                Click to add your first job
              </button>
            </motion.div>
          ) : (
            data.experience.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="p-8 bg-zinc-900/40 border border-zinc-800/60 rounded-[2rem] relative group shadow-2xl backdrop-blur-md"
              >
                <button
                  onClick={() => handleRemove(exp.id)}
                  className="absolute -top-3 -right-3 p-2 bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-red-400 rounded-full shadow-xl transition-all hover:scale-110 opacity-0 group-hover:opacity-100 z-10"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  <div className="space-y-2.5">
                    <label className="flex items-center gap-2 text-sm font-medium text-zinc-400">
                      <Briefcase className="w-4 h-4 text-blue-400" />
                      Job Title
                    </label>
                    <input
                      value={exp.position}
                      onChange={(e) => handleUpdate(exp.id, "position", e.target.value)}
                      className="w-full px-5 py-3.5 rounded-2xl border border-zinc-800 bg-zinc-950/50 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder:text-zinc-700"
                      placeholder="e.g. Software Engineer"
                    />
                  </div>

                  <div className="space-y-2.5">
                    <label className="flex items-center gap-2 text-sm font-medium text-zinc-400">
                      <Building2 className="w-4 h-4 text-purple-400" />
                      Company Name
                    </label>
                    <input
                      value={exp.company}
                      onChange={(e) => handleUpdate(exp.id, "company", e.target.value)}
                      className="w-full px-5 py-3.5 rounded-2xl border border-zinc-800 bg-zinc-950/50 focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all placeholder:text-zinc-700"
                      placeholder="e.g. Tech Corp"
                    />
                  </div>

                  <div className="space-y-2.5">
                    <label className="flex items-center gap-2 text-sm font-medium text-zinc-400">
                      <Calendar className="w-4 h-4 text-emerald-400" />
                      Start Date
                    </label>
                    <input
                      value={exp.startDate}
                      onChange={(e) => handleUpdate(exp.id, "startDate", e.target.value)}
                      className="w-full px-5 py-3.5 rounded-2xl border border-zinc-800 bg-zinc-950/50 focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all placeholder:text-zinc-700"
                      placeholder="e.g. Jan 2020"
                    />
                  </div>

                  <div className="space-y-2.5">
                    <label className="flex items-center gap-2 text-sm font-medium text-zinc-400">
                      <Calendar className="w-4 h-4 text-pink-400" />
                      End Date
                    </label>
                    <input
                      value={exp.endDate}
                      onChange={(e) => handleUpdate(exp.id, "endDate", e.target.value)}
                      className="w-full px-5 py-3.5 rounded-2xl border border-zinc-800 bg-zinc-950/50 focus:border-pink-500/50 focus:ring-4 focus:ring-pink-500/10 outline-none transition-all placeholder:text-zinc-700"
                      placeholder="e.g. Present"
                    />
                  </div>

                  <div className="space-y-2.5 md:col-span-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-zinc-400">
                      <FileText className="w-4 h-4 text-amber-400" />
                      Description
                    </label>
                    <textarea
                      value={exp.description}
                      onChange={(e) => handleUpdate(exp.id, "description", e.target.value)}
                      rows={4}
                      className="w-full px-5 py-3.5 rounded-2xl border border-zinc-800 bg-zinc-950/50 focus:border-amber-500/50 focus:ring-4 focus:ring-amber-500/10 outline-none transition-all resize-none placeholder:text-zinc-700"
                      placeholder="Describe your responsibilities and achievements..."
                    />
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
