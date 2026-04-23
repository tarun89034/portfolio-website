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
  return (
    <section id="skills" className="section-cinema relative overflow-hidden bg-[#0f131e]">
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[800px] rounded-full bg-indigo-500/5 blur-[120px]" />
      
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-12">
          <p className="text-xs uppercase tracking-[0.2em] text-indigo-400/80">Expertise</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-white md:text-5xl">
            Core <span className="gradient-text">Strengths</span>
          </h2>
          <div className="mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {portfolioSkills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card group relative p-8 transition-all hover:-translate-y-1 hover:border-white/20"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative z-10">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform">
                  {iconMap[skill] || <Zap className="text-slate-400" />}
                </div>
                <h3 className="text-lg font-bold text-slate-100 mb-2">
                  {skill.split(',')[0]}
                </h3>
                <p className="text-sm leading-relaxed text-slate-400">
                  {skill.includes(',') ? skill.split(',').slice(1).join(',').trim() : "Advanced implementation and architectural design."}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
