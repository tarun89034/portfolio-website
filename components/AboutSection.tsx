"use client";
import { motion } from "framer-motion";

export default function AboutSection() {
  const stats = [
    { value: "8+", label: "AI Projects Shipped" },
    { value: "5+", label: "ML Models in Production" },
    { value: "3+", label: "Years Building" },
    { value: "∞", label: "Coffee Consumed" },
  ];

  return (
    <section id="about" className="py-16 lg:py-24 px-6 sm:px-8 lg:px-12 xl:px-20 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left — Text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-1 h-8 rounded-full bg-gradient-to-b from-[#6C8CFF] to-[#A855F7]" />
            <span className="font-mono text-xs tracking-[0.3em] uppercase text-[#6C8CFF]/70">About</span>
          </div>

          <h2 className="font-display text-4xl md:text-5xl text-white mb-6 leading-tight">
            Engineer by mind,<br />
            <span className="gradient-text">storyteller by code</span>
          </h2>

          <div className="space-y-4 font-body text-white/50 leading-relaxed text-base max-w-xl">
            <p>
              I&apos;m Tarun — an AI Engineer focused on building production-grade ML systems, GenAI applications, and intelligent backends that create real impact.
            </p>
            <p>
              My work spans the full AI stack: from fine-tuning LLMs and designing RAG pipelines to building quantitative finance tools and real-time ML observability systems.
            </p>
            <p>
              I believe the best AI systems aren&apos;t just technically sound — they feel intuitive and almost magical to use. That&apos;s the standard I build toward.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 mt-8">
            {["LLMs", "RAG", "MLOps", "Quant Finance", "Backend Systems"].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 rounded-full font-mono text-xs tracking-wider uppercase glass-card text-white/50 border-[rgba(108,140,255,0.15)]"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Right — Stats */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 gap-5 sm:gap-6"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.1 }}
              whileHover={{ scale: 1.04 }}
              className="glass-card rounded-2xl p-6 sm:p-8 flex flex-col gap-3 group cursor-default transition-all duration-300 hover:scale-[1.01]"
            >
              <span
                className="font-display text-4xl md:text-5xl gradient-text"
                style={{ lineHeight: 1 }}
              >
                {stat.value}
              </span>
              <span className="font-mono text-xs tracking-[0.15em] uppercase text-white/30 group-hover:text-white/50 transition-colors">
                {stat.label}
              </span>
            </motion.div>
          ))}

          {/* Visual accent block */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="col-span-2 glass-card rounded-2xl p-6 sm:p-8 relative overflow-hidden"
          >
            <div
              className="absolute inset-0 opacity-40"
              style={{
                background: "radial-gradient(ellipse at 80% 50%, rgba(108,140,255,0.15) 0%, transparent 60%)",
              }}
            />
            <div className="relative z-10">
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#6C8CFF]/60 mb-2">
                Current Focus
              </p>
              <p className="font-display text-xl text-white/80">
                Agentic AI Systems & LLM Infrastructure
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
