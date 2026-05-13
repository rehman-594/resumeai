"use client";

import { useResumeStore, Education } from "@/store/useResumeStore";
import { Plus, Trash2, GraduationCap, School, Calendar, BookOpen, UserCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function EducationForm() {
  const { data, updateData } = useResumeStore();

  const handleAdd = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      school: "",
      degree: "",
      startDate: "",
      endDate: "",
      description: "",
    };
    updateData("education", [...data.education, newEdu]);
  };

  const handleUpdate = (id: string, field: keyof Education, value: string) => {
    const updated = data.education.map((edu) =>
      edu.id === id ? { ...edu, [field]: value } : edu
    );
    updateData("education", updated);
  };

  const handleRemove = (id: string) => {
    const filtered = data.education.filter((edu) => edu.id !== id);
    updateData("education", filtered);
  };

  return (
    <div className="space-y-8 pb-12 text-zinc-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-purple-500/10 rounded-xl border border-purple-500/20">
            <GraduationCap className="w-6 h-6 text-purple-400" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Education</h2>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-200 px-5 py-2.5 rounded-xl border border-zinc-700/50 transition-all active:scale-95 text-sm font-medium"
        >
          <Plus className="w-4 h-4" /> Add Education
        </button>
      </div>

      <div className="space-y-10">
        <AnimatePresence mode="popLayout">
          {data.education.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20 bg-zinc-900/30 border border-zinc-800/50 rounded-3xl backdrop-blur-sm"
            >
              <div className="w-16 h-16 bg-zinc-800/50 rounded-full flex items-center justify-center mx-auto mb-4 border border-zinc-700/30">
                <School className="w-8 h-8 text-zinc-500" />
              </div>
              <p className="text-zinc-400 font-medium">No education details added yet.</p>
              <button
                onClick={handleAdd}
                className="mt-4 text-purple-400 hover:text-purple-300 transition-colors text-sm font-medium"
              >
                Click to add your first degree
              </button>
            </motion.div>
          ) : (
            data.education.map((edu, index) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="p-8 bg-zinc-900/40 border border-zinc-800/60 rounded-[2rem] relative group shadow-2xl backdrop-blur-md"
              >
                <button
                  onClick={() => handleRemove(edu.id)}
                  className="absolute -top-3 -right-3 p-2 bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-red-400 rounded-full shadow-xl transition-all hover:scale-110 opacity-0 group-hover:opacity-100 z-10"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  <div className="space-y-2.5">
                    <label className="flex items-center gap-2 text-sm font-medium text-zinc-400">
                      <School className="w-4 h-4 text-purple-400" />
                      School / University
                    </label>
                    <input
                      value={edu.school}
                      onChange={(e) => handleUpdate(edu.id, "school", e.target.value)}
                      className="w-full px-5 py-3.5 rounded-2xl border border-zinc-800 bg-zinc-950/50 focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all placeholder:text-zinc-700"
                      placeholder="e.g. Stanford University"
                    />
                  </div>

                  <div className="space-y-2.5">
                    <label className="flex items-center gap-2 text-sm font-medium text-zinc-400">
                      <GraduationCap className="w-4 h-4 text-blue-400" />
                      Degree / Certificate
                    </label>
                    <input
                      value={edu.degree}
                      onChange={(e) => handleUpdate(edu.id, "degree", e.target.value)}
                      className="w-full px-5 py-3.5 rounded-2xl border border-zinc-800 bg-zinc-950/50 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder:text-zinc-700"
                      placeholder="e.g. Bachelor of Computer Science"
                    />
                  </div>

                  <div className="space-y-2.5">
                    <label className="flex items-center gap-2 text-sm font-medium text-zinc-400">
                      <Calendar className="w-4 h-4 text-emerald-400" />
                      Start Date
                    </label>
                    <input
                      value={edu.startDate}
                      onChange={(e) => handleUpdate(edu.id, "startDate", e.target.value)}
                      className="w-full px-5 py-3.5 rounded-2xl border border-zinc-800 bg-zinc-950/50 focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all placeholder:text-zinc-700"
                      placeholder="e.g. Sep 2018"
                    />
                  </div>

                  <div className="space-y-2.5">
                    <label className="flex items-center gap-2 text-sm font-medium text-zinc-400">
                      <Calendar className="w-4 h-4 text-pink-400" />
                      End Date
                    </label>
                    <input
                      value={edu.endDate}
                      onChange={(e) => handleUpdate(edu.id, "endDate", e.target.value)}
                      className="w-full px-5 py-3.5 rounded-2xl border border-zinc-800 bg-zinc-950/50 focus:border-pink-500/50 focus:ring-4 focus:ring-pink-500/10 outline-none transition-all placeholder:text-zinc-700"
                      placeholder="e.g. Jun 2022 (or Present)"
                    />
                  </div>

                  <div className="space-y-2.5 md:col-span-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-zinc-400">
                      <BookOpen className="w-4 h-4 text-amber-400" />
                      Description / Honors (Optional)
                    </label>
                    <textarea
                      value={edu.description}
                      onChange={(e) => handleUpdate(edu.id, "description", e.target.value)}
                      rows={3}
                      className="w-full px-5 py-3.5 rounded-2xl border border-zinc-800 bg-zinc-950/50 focus:border-amber-500/50 focus:ring-4 focus:ring-amber-500/10 outline-none transition-all resize-none placeholder:text-zinc-700"
                      placeholder="e.g. GPA: 3.9/4.0, Dean's List, Relevant coursework..."
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
