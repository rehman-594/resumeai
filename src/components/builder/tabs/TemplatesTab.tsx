"use client";

import { motion } from "framer-motion";
import { Check, Layout, Star } from "lucide-react";
import ResumePreview from "../preview/ResumePreview";
import { ResumeData } from "@/store/useResumeStore";

const DUMMY_DATA: ResumeData = {
  personalInfo: {
    fullName: "Alex Sterling",
    email: "alex.sterling@example.com",
    phone: "+1 (555) 000-1111",
    location: "San Francisco, CA",
    website: "alexsterling.dev",
    summary: "Senior Software Engineer with 8+ years of experience in full-stack development. Proven track record of scaling distributed systems and leading cross-functional teams to deliver high-impact features."
  },
  experience: [
    {
      id: "1",
      company: "Tech Giant Corp",
      position: "Senior Full Stack Engineer",
      startDate: "Jan 2020",
      endDate: "Present",
      description: "• Led the migration of legacy monolith to microservices architecture using Node.js and AWS.\n• Improved system performance by 40% through advanced caching strategies.\n• Mentored 10+ junior developers and established CI/CD best practices."
    },
    {
      id: "2",
      company: "InnovaStart Inc",
      position: "Full Stack Developer",
      startDate: "Jun 2016",
      endDate: "Dec 2019",
      description: "• Developed and maintained the core user-facing dashboard using React and GraphQL.\n• Collaborated with design teams to implement pixel-perfect, responsive UI components.\n• Integrated third-party APIs for seamless payment processing and analytics."
    }
  ],
  education: [
    {
      id: "1",
      school: "University of Technology",
      degree: "B.S. in Computer Science",
      startDate: "2012",
      endDate: "2016",
      description: "GPA: 3.9/4.0. Specialized in Distributed Systems."
    }
  ],
  projects: [
    {
      id: "1",
      title: "CloudScale AI",
      link: "github.com/alex/cloudscale",
      description: "An open-source library for auto-scaling Kubernetes clusters based on custom AI metrics.",
      technologies: "Go, Kubernetes, TensorFlow",
      date: "2023"
    }
  ],
  skills: "JavaScript, TypeScript, React, Node.js, Go, AWS, Docker, Kubernetes, GraphQL, PostgreSQL",
  certifications: "AWS Certified Solutions Architect, Google Cloud Professional Architect",
  achievements: "Winner of Global Hackathon 2022, Published 5+ technical articles on medium.com"
};

const TEMPLATES = [
  { id: "classic", name: "Classic Professional", desc: "Traditional layout, perfect for corporate roles." },
  { id: "modern", name: "Modern Minimal", desc: "Clean and spacious design with blue accents." },
  { id: "minimal", name: "Minimalist", desc: "Focuses on content with a subtle grid structure." },
  { id: "aesthetic", name: "Creative Aesthetic", desc: "Elegant design with emerald touches and center-aligned header." },
  { id: "professional", name: "High-End Corporate", desc: "Two-column layout with a strong sidebar presence." },
];

interface TemplatesTabProps {
  selectedTemplate: string;
  onSelect: (id: string) => void;
}

export default function TemplatesTab({ selectedTemplate, onSelect }: TemplatesTabProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-10 pb-20"
    >
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h2 className="text-4xl font-black tracking-tight bg-gradient-to-r from-white via-white to-zinc-500 bg-clip-text text-transparent italic">
          Choose Your Canvas
        </h2>
        <p className="text-zinc-400 font-medium">
          Select from our curated collection of professional templates. 
          Each one is designed to be ATS-friendly and visually stunning.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {TEMPLATES.map((tmpl, index) => (
          <motion.div
            key={tmpl.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onSelect(tmpl.id)}
            className={`group relative cursor-pointer rounded-[2.5rem] overflow-hidden border-2 transition-all duration-500 ${
              selectedTemplate === tmpl.id 
                ? "border-purple-500 ring-4 ring-purple-500/10 scale-[1.02]" 
                : "border-zinc-800/50 hover:border-zinc-700 hover:scale-[1.01]"
            }`}
          >
            {/* Template Card Content */}
            <div className="aspect-[3/4] bg-zinc-900/50 relative overflow-hidden">
               {/* Simplified Preview Render */}
               <div className="absolute inset-0 origin-top scale-[0.4] pointer-events-none p-10 opacity-40 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="w-[250%] h-[250%] bg-white rounded-xl shadow-2xl">
                     {/* We use a separate context for the preview if needed, but here we just render it with dummy data */}
                     {/* Note: ResumePreview usually reads from store, so we might need a version that accepts data as prop */}
                     <div className="p-8">
                        <div className="h-4 w-32 bg-zinc-200 mb-4"></div>
                        <div className="h-2 w-full bg-zinc-100 mb-2"></div>
                        <div className="h-2 w-full bg-zinc-100 mb-2"></div>
                        <div className="h-2 w-2/3 bg-zinc-100"></div>
                     </div>
                  </div>
               </div>

               {/* Overlay for selection */}
               <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
               
               <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex items-center justify-between mb-2">
                     <h3 className="text-xl font-bold text-white">{tmpl.name}</h3>
                     {selectedTemplate === tmpl.id && (
                        <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/40">
                           <Check className="w-5 h-5 text-white" />
                        </div>
                     )}
                  </div>
                  <p className="text-zinc-400 text-sm font-medium leading-relaxed line-clamp-2">
                     {tmpl.desc}
                  </p>
               </div>
            </div>

            {/* Premium Badge */}
            {index < 2 && (
               <div className="absolute top-6 right-6 px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-500 rounded-lg text-[10px] font-black uppercase tracking-widest backdrop-blur-md flex items-center gap-1.5">
                  <Star className="w-3 h-3 fill-amber-500" />
                  Premium
               </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

