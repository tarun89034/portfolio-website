"use client";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  tags: string[];
  live: string;
  github: string;
  color: string;
  gradient: string;
  icon: string;
}

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 modal-backdrop bg-[#0B0F1A]/60"
        >
          <motion.div
            key="modal-content"
            initial={{ opacity: 0, scale: 0.85, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl"
            style={{
              background: "rgba(15, 20, 35, 0.95)",
              border: `1px solid ${project.color}30`,
              boxShadow: `0 0 80px ${project.color}20, 0 40px 100px rgba(0,0,0,0.7)`,
            }}
          >
            {/* Header visual */}
            <div className="relative h-48 md:h-64 overflow-hidden rounded-t-3xl">
              <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`} />
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `radial-gradient(ellipse at 30% 30%, ${project.color}40 0%, transparent 60%)`,
                }}
              />
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `linear-gradient(${project.color}20 1px, transparent 1px), linear-gradient(90deg, ${project.color}20 1px, transparent 1px)`,
                  backgroundSize: "40px 40px",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f1423] via-transparent to-transparent" />

              {/* Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-8xl opacity-30">{project.icon}</span>
              </div>

              {/* Category */}
              <div className="absolute top-6 left-6">
                <span
                  className="px-3 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase"
                  style={{ background: `${project.color}20`, color: project.color, border: `1px solid ${project.color}40` }}
                >
                  {project.category}
                </span>
              </div>

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-5 right-5 w-9 h-9 rounded-full glass-card flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="p-8 md:p-10">
              <h2 className="font-display text-2xl md:text-4xl text-white mb-2">{project.title}</h2>
              <p className="font-mono text-sm tracking-widest uppercase mb-6" style={{ color: project.color }}>
                {project.subtitle}
              </p>

              <p className="font-body text-white/60 leading-relaxed mb-8 text-base">
                {project.description}
              </p>

              {/* Tech Stack */}
              <div className="mb-8">
                <h4 className="font-mono text-xs tracking-[0.2em] uppercase text-white/30 mb-3">Tech Stack</h4>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase"
                      style={{
                        background: `${project.color}10`,
                        color: project.color,
                        border: `1px solid ${project.color}30`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="flex flex-wrap gap-4 pt-6 border-t border-white/5">
                {project.live && (
                  <motion.a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2.5 px-6 py-3 rounded-full font-body font-medium text-sm tracking-wider uppercase text-white transition-all"
                    style={{
                      background: `linear-gradient(135deg, ${project.color}80, rgba(168,85,247,0.6))`,
                      boxShadow: `0 4px 20px ${project.color}30`,
                    }}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Live Demo
                  </motion.a>
                )}
                {project.github && (
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2.5 px-6 py-3 rounded-full font-body font-medium text-sm tracking-wider uppercase text-white/80 glass-card border border-white/10 hover:border-white/25 transition-all"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                    </svg>
                    GitHub
                  </motion.a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
