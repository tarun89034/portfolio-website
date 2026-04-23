"use client";

import React from "react";
import { motion } from "framer-motion";
import { portfolioSkills } from "../utils/siteContent";
import { Code2, Cpu, Database, Globe, Layers, Zap } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  "Python, TypeScript, JavaScript": <Code2 className="text-blue-400" />,
  "Large Language Models": <Cpu className="text-purple-400" />,
  "RAG Systems": <Zap className="text-amber-400" />,
  "MLOps": <Layers className="text-emerald-400" />,
  "PyTorch, TensorFlow, LangChain, RAG Systems, LLM Fine-tuning (QLoRA), GGUF Inference, Mistral-7B": <Cpu className="text-indigo-400" />,
  "PostgreSQL, MySQL": <Database className="text-cyan-400" />,
  "React.js, Next.js, Node.js, Express.js, FastAPI, Tailwind CSS, REST APIs": <Globe className="text-sky-400" />,
  "AWS (EC2, S3, Lambda), Google Cloud (Vertex AI, Gemini), Docker, Kubernetes, CI/CD": <Layers className="text-orange-400" />,
  "Quant Analytics": <Zap className="text-rose-400" />,
};

export default function SkillsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-[#0f131e]">
      {/* Decorative backdrop */}
      <div className="pointer-events-none absolute left-1/4 top-0 h-[500px] w-[500px] rounded-full bg-indigo-500/5 blur-[120px]" />
      <div className="pointer-events-none absolute right-1/4 bottom-0 h-[500px] w-[500px] rounded-full bg-purple-500/5 blur-[120px]" />
      
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-indigo-400 font-bold">Engineering Portfolio</p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight text-white md:text-5xl">
            Technical <span className="text-indigo-400">Capabilities</span>
          </h2>
          <div className="mt-6 h-1 w-20 rounded-full bg-indigo-500" />
        </div>

        {/* Task 1: Capability Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 gap-8 md:grid-cols-2"
        >
          {portfolioSkills.map((skillString, index) => {
            // Parsing Task 6 format
            const [titlePart, techPart] = skillString.split('|');
            const [title, description] = titlePart.split(':');
            
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                className="group relative"
              >
                {/* Task 3: Capability Card Styling */}
                <div className="h-full rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-white/10 p-8 transition-all duration-300 hover:-translate-y-2 hover:bg-white/[0.05] hover:border-indigo-500/30 hover:shadow-[0_20px_50px_rgba(108,140,255,0.15)]">
                  <div className="flex items-start justify-between mb-6">
                    {/* Task 4: Typography Hierarchy */}
                    <div>
                      <h3 className="text-xl font-bold text-slate-100 tracking-tight group-hover:text-indigo-300 transition-colors">
                        {title.trim()}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-400">
                        {description.trim()}
                      </p>
                    </div>
                    <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                      {index === 0 && <Cpu size={20} />}
                      {index === 1 && <Database size={20} />}
                      {index === 2 && <Globe size={20} />}
                      {index === 3 && <Layers size={20} />}
                      {index === 4 && <Zap size={20} />}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/5">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500 font-bold mb-3">Core Technologies</p>
                    <div className="flex flex-wrap gap-2">
                      {techPart.split(',').map((tech, tIdx) => (
                        <span 
                          key={tIdx}
                          className="px-3 py-1 rounded-md bg-white/5 border border-white/5 text-[12px] text-slate-300 font-medium group-hover:border-indigo-500/20 group-hover:text-slate-200 transition-all"
                        >
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
