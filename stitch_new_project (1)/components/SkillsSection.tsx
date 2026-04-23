"use client";

import React from "react";
import { motion } from "framer-motion";
import { portfolioSkills } from "../utils/siteContent";
import { Code2, Cpu, Database, Globe, Layers, Zap, Cloud } from "lucide-react";

const techIcons: Record<string, { icon: any, color: string }> = {
  // AI & ML (Muted Purple)
  "LLMs": { icon: Cpu, color: "#C084FC" },
  "RAG": { icon: Cpu, color: "#C084FC" },
  "Fine-tuning": { icon: Cpu, color: "#C084FC" },
  "Inference Optimization": { icon: Cpu, color: "#C084FC" },
  "MLOps": { icon: Cpu, color: "#C084FC" },
  "PyTorch": { icon: Cpu, color: "#C084FC" },
  "TensorFlow": { icon: Cpu, color: "#C084FC" },
  // Data (Muted Cyan)
  "PostgreSQL": { icon: Database, color: "#7DD3FC" },
  "Vector Databases (ChromaDB, Pinecone)": { icon: Database, color: "#7DD3FC" },
  // Backend & Languages (Muted Blue)
  "FastAPI": { icon: Code2, color: "#60A5FA" },
  "gRPC": { icon: Code2, color: "#60A5FA" },
  "Python": { icon: Code2, color: "#60A5FA" },
  // Frontend (Muted Emerald)
  "React.js": { icon: Globe, color: "#6EE7B7" },
  "Next.js": { icon: Globe, color: "#6EE7B7" },
  "Framer Motion": { icon: Globe, color: "#6EE7B7" },
  "Tailwind CSS": { icon: Layers, color: "#6EE7B7" },
  // Cloud & Infra (Muted Orange)
  "AWS": { icon: Cloud, color: "#FDBA74" },
  "Google Cloud": { icon: Cloud, color: "#FDBA74" },
  "Docker": { icon: Layers, color: "#FDBA74" },
  "Kubernetes": { icon: Layers, color: "#FDBA74" },
  "Terraform": { icon: Layers, color: "#FDBA74" },
  // Specialized (Muted Rose)
  "Quant Analytics": { icon: Zap, color: "#FDA4AF" },
  "LangChain": { icon: Zap, color: "#C084FC" } // ML aligned
};

export default function SkillsSection() {
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
                <div className="relative h-full overflow-hidden rounded-[20px] bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] p-8 transition-all duration-300 hover:-translate-y-[6px] hover:scale-[1.01] hover:bg-white/[0.05] hover:border-indigo-500/40 hover:shadow-[0_15px_50px_rgba(108,140,255,0.2)]">
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

                    <div className="pt-7 border-t border-white/[0.05]">
                      <p className="text-[10px] uppercase tracking-[0.3em] text-slate-500 font-bold mb-5">Core Stack</p>
                      <div className="flex flex-wrap gap-[10px]">
                        {techStack.map((tech, tIdx) => {
                          const iconData = techIcons[tech];
                          const Icon = iconData?.icon;
                          const iconColor = iconData?.color || "#A5B4FC";
                          
                          return (
                            <span 
                              key={tIdx}
                              className="inline-flex items-center gap-1.5 px-[14px] py-[8px] rounded-full bg-indigo-500/[0.18] border border-indigo-500/[0.35] text-[13px] text-[#E5E7EB] font-medium backdrop-blur-[8px] transition-all duration-250 hover:bg-indigo-500/[0.3] hover:shadow-[0_0_10px_rgba(108,140,255,0.35)] whitespace-nowrap tracking-[0.3px] group/pill"
                            >
                              {Icon && (
                                <Icon 
                                  size={14} 
                                  style={{ color: iconColor }}
                                  className="opacity-80 group-hover/pill:opacity-100 group-hover/pill:scale-110 transition-all duration-200" 
                                />
                              )}
                              {tech}
                            </span>
                          );
                        })}
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
