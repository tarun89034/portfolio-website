"use client";
import { motion } from "framer-motion";

export default function AboutSection() {
  const stats = [
    { value: "12+", label: "End-to-end Projects Completed" },
    { value: "4+", label: "ML Models Deployed" },
    { value: "∞", label: "Coffee Consumed" },
  ];

  return (
    <section id="about" className="py-16 lg:py-24 px-8 sm:px-12 lg:px-16 xl:px-24 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Left — Text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-1 h-8 rounded-full bg-gradient-to-b from-[#6C8CFF] to-[#A855F7]" />
            <span className="font-mono text-xs tracking-[0.3em] uppercase text-[#6C8CFF]/70">About</span>
          </div>

          <h2 className="font-display text-4xl md:text-5xl text-white mb-8 leading-tight">
            Engineer by mind,<br />
            <span className="gradient-text">storyteller by code</span>
          </h2>

          <div className="space-y-6 font-body text-white/60 text-[17px] leading-8 max-w-xl">
            <p>
              I&apos;m Tarun — a backend engineer focused on building distributed systems that hold up under real load: high concurrency, race conditions, and the kind of scale that breaks naive implementations.
            </p>
            <p>
              My work spans backend APIs, distributed systems, and data pipelines — including a coordination-free web crawler, high-concurrency transaction processing, and applied LLM engineering (fine-tuning, RAG) for quantitative finance tools.
            </p>
            <p>
              I believe the best systems aren't the ones that just work in a demo — they're the ones that hold up when things get hard: concurrent load, edge cases, failure states. That's the standard I build toward.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 sm:gap-4 mt-10">
            {["Backend Systems", "Distributed Systems", "FastAPI", "Redis & Kafka", "Quant Finance", "Applied LLM Engineering"].map((tag) => (
              <span
                key={tag}
                className="px-4 py-2 rounded-full font-mono text-xs tracking-wider uppercase glass-card text-white/50 border-[rgba(108,140,255,0.15)]"
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
          className="grid grid-cols-2 gap-5 sm:gap-8"
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
                Distributed Systems & High-Concurrency Backend Architecture
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
