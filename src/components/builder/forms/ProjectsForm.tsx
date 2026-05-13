"use client";

import { useResumeStore, Project } from "@/store/useResumeStore";
import { Plus, Trash2, Folder, Wrench, Link as LinkIcon, Calendar, Pencil, Share2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProjectsForm() {
  const { data, updateData } = useResumeStore();

  const handleAdd = () => {
    const newProj: Project = {
      id: Date.now().toString(),
      title: "",
      link: "",
      description: "",
      technologies: "",
      date: "",
    };
    updateData("projects", [...data.projects, newProj]);
  };

  const handleUpdate = (id: string, field: keyof Project, value: string) => {
    const updated = data.projects.map((proj) =>
      proj.id === id ? { ...proj, [field]: value } : proj
    );
    updateData("projects", updated);
  };

  const handleRemove = (id: string) => {
    const filtered = data.projects.filter((proj) => proj.id !== id);
    updateData("projects", filtered);
  };

  return (
    <div className="space-y-8 pb-12 text-zinc-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-500/10 rounded-xl border border-blue-500/20">
            <Share2 className="w-6 h-6 text-blue-400" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight">Projects</h2>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-200 px-5 py-2.5 rounded-xl border border-zinc-700/50 transition-all active:scale-95 text-sm font-medium"
        >
          <Plus className="w-4 h-4" /> Add More
        </button>
      </div>

      <div className="space-y-10">
        <AnimatePresence mode="popLayout">
          {data.projects.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20 bg-zinc-900/30 border border-zinc-800/50 rounded-3xl backdrop-blur-sm"
            >
              <div className="w-16 h-16 bg-zinc-800/50 rounded-full flex items-center justify-center mx-auto mb-4 border border-zinc-700/30">
                <Folder className="w-8 h-8 text-zinc-500" />
              </div>
              <p className="text-zinc-400 font-medium">No projects added yet.</p>
              <button
                onClick={handleAdd}
                className="mt-4 text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium"
              >
                Click to add your first project
              </button>
            </motion.div>
          ) : (
            data.projects.map((proj, index) => (
              <motion.div
                key={proj.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="p-8 bg-zinc-900/40 border border-zinc-800/60 rounded-[2rem] relative group shadow-2xl backdrop-blur-md"
              >
                <button
                  onClick={() => handleRemove(proj.id)}
                  className="absolute -top-3 -right-3 p-2 bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-red-400 rounded-full shadow-xl transition-all hover:scale-110 opacity-0 group-hover:opacity-100 z-10"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  {/* Project Name */}
                  <div className="space-y-2.5">
                    <label className="flex items-center gap-2 text-sm font-medium text-zinc-400">
                      <Folder className="w-4 h-4 text-purple-400" />
                      Project Name
                    </label>
                    <input
                      value={proj.title}
                      onChange={(e) => handleUpdate(proj.id, "title", e.target.value)}
                      className="w-full px-5 py-3.5 rounded-2xl border border-zinc-800 bg-zinc-950/50 focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all placeholder:text-zinc-700"
                      placeholder="E-commerce Platform"
                    />
                  </div>

                  {/* Technologies Used */}
                  <div className="space-y-2.5">
                    <label className="flex items-center gap-2 text-sm font-medium text-zinc-400">
                      <Wrench className="w-4 h-4 text-blue-400" />
                      Technologies Used
                    </label>
                    <input
                      value={proj.technologies || ""}
                      onChange={(e) => handleUpdate(proj.id, "technologies", e.target.value)}
                      className="w-full px-5 py-3.5 rounded-2xl border border-zinc-800 bg-zinc-950/50 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder:text-zinc-700"
                      placeholder="e.g., React, Node.js, MongoDB"
                    />
                  </div>

                  {/* Link */}
                  <div className="space-y-2.5">
                    <label className="flex items-center gap-2 text-sm font-medium text-zinc-400">
                      <LinkIcon className="w-4 h-4 text-indigo-400" />
                      Link (optional)
                    </label>
                    <input
                      value={proj.link}
                      onChange={(e) => handleUpdate(proj.id, "link", e.target.value)}
                      className="w-full px-5 py-3.5 rounded-2xl border border-zinc-800 bg-zinc-950/50 focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all placeholder:text-zinc-700"
                      placeholder="e.g., github.com/username/project"
                    />
                  </div>

                  {/* Date */}
                  <div className="space-y-2.5">
                    <label className="flex items-center gap-2 text-sm font-medium text-zinc-400">
                      <Calendar className="w-4 h-4 text-pink-400" />
                      Date
                    </label>
                    <input
                      value={proj.date || ""}
                      onChange={(e) => handleUpdate(proj.id, "date", e.target.value)}
                      className="w-full px-5 py-3.5 rounded-2xl border border-zinc-800 bg-zinc-950/50 focus:border-pink-500/50 focus:ring-4 focus:ring-pink-500/10 outline-none transition-all placeholder:text-zinc-700"
                      placeholder="e.g., 2023"
                    />
                  </div>

                  {/* Description */}
                  <div className="space-y-2.5 md:col-span-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-zinc-400">
                      <Pencil className="w-4 h-4 text-emerald-400" />
                      Describe the project
                    </label>
                    <textarea
                      value={proj.description}
                      onChange={(e) => handleUpdate(proj.id, "description", e.target.value)}
                      rows={4}
                      className="w-full px-5 py-3.5 rounded-2xl border border-zinc-800 bg-zinc-950/50 focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all resize-none placeholder:text-zinc-700"
                      placeholder="e.g., Built a full-stack e-commerce platform with user authentication, shopping cart, and payment integration. Has over 1000 users."
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
