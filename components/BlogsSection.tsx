"use client";
import { motion } from "framer-motion";

interface Blog {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
}

const categoryColors: Record<string, string> = {
  "Machine Learning": "#6C8CFF",
  "GenAI": "#A855F7",
  "MLOps": "#10B981",
};

export default function BlogsSection({ blogs }: { blogs: Blog[] }) {
  return (
    <section id="blogs" className="py-24 px-6 md:px-16 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="flex items-center justify-between mb-16"
      >
        <div>
          <div className="flex items-center gap-4 mb-2">
            <div className="w-1 h-8 rounded-full bg-gradient-to-b from-[#6C8CFF] to-[#A855F7]" />
            <h2 className="font-display text-3xl md:text-5xl text-white tracking-wide">Insights & Writing</h2>
          </div>
          <p className="font-body text-white/40 ml-5 mt-2">Thoughts on AI, engineering, and the future</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {blogs.map((blog, i) => {
          const color = categoryColors[blog.category] || "#6C8CFF";
          return (
            <motion.article
              key={blog.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="glass-card rounded-2xl p-8 cursor-pointer group transition-all duration-300 hover:border-[rgba(108,140,255,0.3)]"
              style={{ borderColor: `${color}15` }}
            >
              {/* Top bar */}
              <div
                className="w-8 h-0.5 mb-6 rounded-full transition-all duration-300 group-hover:w-16"
                style={{ background: color }}
              />

              <div className="flex items-center gap-2 mb-4">
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color }}>
                  {blog.category}
                </span>
                <span className="text-white/20">·</span>
                <span className="font-mono text-[10px] text-white/30">{blog.readTime}</span>
              </div>

              <h3 className="font-display text-lg text-white mb-3 group-hover:text-[#6C8CFF] transition-colors leading-tight">
                {blog.title}
              </h3>

              <p className="font-body text-sm text-white/40 leading-relaxed mb-6">
                {blog.excerpt}
              </p>

              <div className="flex items-center gap-2 text-white/30 group-hover:text-white/60 transition-colors">
                <span className="font-mono text-xs">Read more</span>
                <svg className="w-3 h-3 translate-x-0 group-hover:translate-x-1.5 transition-transform" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
