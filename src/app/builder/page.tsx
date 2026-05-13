"use client";

import { useState } from "react";
import { 
  User, Briefcase, GraduationCap, Code, Award, 
  ChevronRight, Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import PersonalInfoForm from "@/components/builder/forms/PersonalInfoForm";
import ExperienceForm from "@/components/builder/forms/ExperienceForm";
import EducationForm from "@/components/builder/forms/EducationForm";
import ProjectsForm from "@/components/builder/forms/ProjectsForm";
import SkillsForm from "@/components/builder/forms/SkillsForm";
import AIReviewPanel from "@/components/builder/AIReviewPanel";

const STEPS = [
  { id: "personal", label: "Personal Info", icon: User },
  { id: "experience", label: "Experience", icon: Briefcase },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "projects", label: "Projects", icon: Code },
  { id: "skills", label: "Skills & Certs", icon: Award },
];

export default function BuilderPage() {
  const [activeStep, setActiveStep] = useState(STEPS[0].id);

  const renderForm = () => {
    switch (activeStep) {
      case "personal": return <PersonalInfoForm />;
      case "experience": return <ExperienceForm />;
      case "education": return <EducationForm />;
      case "projects": return <ProjectsForm />;
      case "skills": return <SkillsForm />;
      default: return null;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col lg:flex-row gap-10"
    >
      {/* Sidebar - Categorized Sections */}
      <aside className="w-full lg:w-72 flex-shrink-0">
        <div className="sticky top-28 space-y-6">
          <div className="space-y-1">
            <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider px-4 mb-4">
              Categories
            </h3>
            <div className="space-y-2">
              {STEPS.map((step) => (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(step.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all group ${
                    activeStep === step.id
                      ? "bg-purple-600/10 border border-purple-500/20 text-purple-400"
                      : "hover:bg-zinc-900 border border-transparent text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <div className={`p-2 rounded-xl transition-colors ${
                    activeStep === step.id ? "bg-purple-600 text-white" : "bg-zinc-900 group-hover:bg-zinc-800 text-zinc-500 group-hover:text-zinc-300"
                  }`}>
                    <step.icon className="w-4 h-4" />
                  </div>
                  <span className="font-medium">{step.label}</span>
                  {activeStep === step.id && (
                    <ChevronRight className="w-4 h-4 ml-auto" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <AIReviewPanel />
        </div>
      </aside>


      {/* Form Area */}
      <div className="flex-1 min-w-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {renderForm()}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}


