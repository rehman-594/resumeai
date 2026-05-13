"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, FileText, Globe, Sparkles, Percent, Shield, Zap, Star } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-purple-500/30 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-600/20 group-hover:scale-110 transition-transform">
              <Percent className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
              ResumeAI
            </span>
          </Link>
          <Link
            href="/builder"
            className="bg-white text-black px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-zinc-200 transition-all flex items-center gap-2 shadow-lg shadow-white/5 active:scale-95"
          >
            Launch Builder
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative pt-40 pb-24 px-6">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-purple-600/20 blur-[120px] -z-10 rounded-full opacity-50" />
        <div className="absolute top-40 right-0 w-72 h-72 bg-blue-600/10 blur-[100px] -z-10 rounded-full" />
        
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl"
          >
            <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-8 leading-[1.05] bg-gradient-to-b from-white via-white to-zinc-500 bg-clip-text text-transparent">
              Your career, <br />
              <span className="text-purple-500 italic">elevated.</span>
            </h1>

            
            <p className="text-xl md:text-2xl text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
              Create a world-class resume and a stunning portfolio website in seconds. 
              The ultimate toolkit for the modern professional.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href="/builder"
                className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white px-10 py-5 rounded-2xl text-lg font-bold transition-all shadow-xl shadow-purple-600/20 flex items-center justify-center gap-3 active:scale-95 group"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#features"
                className="w-full sm:w-auto bg-zinc-900 hover:bg-zinc-800 text-zinc-300 px-10 py-5 rounded-2xl text-lg font-bold transition-all border border-zinc-800 flex items-center justify-center gap-3 active:scale-95"
              >
                View Templates
              </Link>
            </div>
          </motion.div>

          {/* Feature Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-40 grid grid-cols-1 md:grid-cols-3 gap-8 w-full"
            id="features"
          >
            {[
              {
                icon: <FileText className="w-10 h-10 text-purple-400" />,
                title: "ATS-Optimized Resumes",
                desc: "Beat the bots with templates designed specifically to pass Applicant Tracking Systems with ease.",
                color: "purple"
              },
              {
                icon: <Globe className="w-10 h-10 text-blue-400" />,
                title: "Web Portfolios",
                desc: "Automatically sync your resume data into a stunning, live portfolio website hosted for you.",
                color: "blue"
              },
              {
                icon: <Shield className="w-10 h-10 text-emerald-400" />,
                title: "Data Privacy",
                desc: "Your data is secure and never sold. We prioritize your privacy above all else.",
                color: "emerald"
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="group p-10 rounded-[2.5rem] bg-zinc-900/40 border border-zinc-800/60 text-left hover:bg-zinc-900/60 hover:border-zinc-700/50 transition-all duration-300 relative overflow-hidden backdrop-blur-sm"
              >
                <div className={`mb-6 p-4 rounded-2xl bg-zinc-950 border border-zinc-800 w-fit group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-zinc-500 leading-relaxed font-medium">
                  {feature.desc}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 py-12 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <Link href="/" className="flex items-center gap-2 grayscale opacity-50 hover:opacity-100 transition-opacity">
            <Percent className="w-5 h-5" />
            <span className="font-bold">ResumeAI</span>
          </Link>
          <p className="text-zinc-600 text-sm">© 2026 ResumeAI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
