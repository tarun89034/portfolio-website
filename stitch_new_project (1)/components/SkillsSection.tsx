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
  // Task 2: Refined Stagger Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  const cardVariant = {
    hidden: { 
      opacity: 0, 
      y: 40, 
      scale: 0.96 
    },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="skills" className="py-24 px-5 md:px-10 relative overflow-hidden bg-[#0f131e]">
      {/* Decorative backdrop */}
      <div className="pointer-events-none absolute left-1/4 top-0 h-[500px] w-[500px] rounded-full bg-indigo-500/5 blur-[120px]" />
      <div className="pointer-events-none absolute right-1/4 bottom-0 h-[500px] w-[500px] rounded-full bg-purple-500/5 blur-[120px]" />
      
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 md:px-2">
          <p className="text-xs uppercase tracking-[0.4em] text-indigo-400 font-bold">Expertise Architecture</p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight text-white md:text-5xl">
            Technical <span className="text-indigo-400">Capabilities</span>
          </h2>
          <div className="mt-6 h-1 w-20 rounded-full bg-indigo-500" />
        </div>

        {/* Task 3: Apply to Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 gap-8 md:grid-cols-2"
        >
          {portfolioSkills.map((skillString, index) => {
            const [titlePart, techPart] = skillString.split('|');
            const [title, description] = titlePart.split(':');
            const techStack = techPart.split(',').map(t => t.trim());
            
            return (
              <motion.div
                key={index}
                variants={cardVariant}
                className="group relative will-change-transform"
              >
                {/* Task 1, 4 & 5: Card Styling with Tech Pills and Glow */}
                <div className="relative h-full overflow-hidden rounded-[20px] bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] p-8 transition-all duration-300 hover:-translate-y-[6px] hover:scale-[1.01] hover:bg-white/[0.05] hover:border-indigo-500/40 hover:shadow-[0_15px_50px_rgba(108,140,255,0.2)]">
                  
                  {/* Task 5: Subtle Background Glow Depth (with 0.2s activation delay to prevent jitter) */}
                  <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_left,rgba(108,140,255,0.08),transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200 pointer-events-none" />

                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-8">
                      <div className="flex-1 pr-6">
                        <h3 className="text-[22px] font-bold text-slate-100 tracking-tight leading-tight group-hover:text-indigo-300 transition-colors mb-3">
                          {title.trim()}
                        </h3>
                        <p className="text-[15px] leading-relaxed text-slate-400 mb-6">
                          {description.trim()}
                        </p>
                      </div>
                      <div className="h-12 w-12 flex-shrink-0 flex items-center justify-center rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 group-hover:scale-110 transition-transform duration-300">
                        {index === 0 && <Cpu size={24} />}
                        {index === 1 && <Database size={24} />}
                        {index === 2 && <Globe size={24} />}
                        {index === 3 && <Layers size={24} />}
                        {index === 4 && <Zap size={24} />}
                      </div>
                    </div>

                    {/* Task 1-8: Refined Tech Pills */}
                    <div className="pt-7 border-t border-white/[0.05]">
                      <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-bold mb-5">Core Stack</p>
                      <div className="flex flex-wrap gap-[10px]">
                        {techStack.map((tech, tIdx) => (
                          <span 
                            key={tIdx}
                            className="px-[14px] py-[8px] rounded-full bg-indigo-500/[0.18] border border-indigo-500/[0.35] text-[13px] text-[#E5E7EB] font-medium backdrop-blur-[8px] transition-all duration-250 hover:bg-indigo-500/[0.3] hover:shadow-[0_0_10px_rgba(108,140,255,0.35)] whitespace-nowrap tracking-[0.3px]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
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
