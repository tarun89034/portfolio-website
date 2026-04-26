"use client";

import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { featuredProjects } from "@/stitch_new_project (1)/utils/siteContent";
import { parseDescription } from "@/stitch_new_project (1)/utils/descriptionParser";
import { motion, AnimatePresence } from "framer-motion";
import SiteNavbar from "@/stitch_new_project (1)/components/SiteNavbar";
import SiteFooter from "@/stitch_new_project (1)/components/SiteFooter";
import Lightbox from "@/stitch_new_project (1)/components/Lightbox";
import TechStack from "@/stitch_new_project (1)/components/TechStack";
import { Play, ExternalLink, ArrowLeft, Layers, Shield, Cpu, Code, Zap, Target } from "lucide-react";

export default function ProjectPage() {
  const { id } = useParams();
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const project = useMemo(() => featuredProjects.find((p) => p.id === id), [id]);
  const parsed = useMemo(() => project ? parseDescription(project.description) : null, [project]);
  
  console.log("PROJECT:", project);
  console.log("HERO VIDEO:", project?.heroVideo);

  if (!project || !parsed) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#0f131e] text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Project Not Found</h1>
          <button 
            onClick={() => router.push("/")}
            className="mt-6 text-indigo-400 hover:text-indigo-300"
          >
            Go back to gallery
          </button>
        </div>
      </div>
    );
  }

  return (
    <div key={project.id} className="min-h-screen font-body selection:bg-indigo-500/30">
      
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* ── HERO: Fixed Layering and Height ─────────�          {/* ── COMPACT HERO HEADER ────────────────────────── */}
          <section className="relative w-full py-16 px-8 bg-blue-500">
            {project.heroVideo ? (
              <video
                key={project.heroVideo}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover z-0 opacity-25"
                onError={() => console.error("VIDEO FAILED")}
              >
                <source src={project.heroVideo} type="video/mp4" />
              </video>
            ) : (
              <img
                src={project.image}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover z-0 opacity-25"
              />
            )}
            
            <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F1A]/60 to-[#0B0F1A]/95 pointer-events-none z-0" />

            <div className="max-w-5xl mx-auto flex flex-col gap-4 relative z-10 w-full">
              
              <span className="text-xs border border-indigo-500/30 bg-indigo-500/20 px-3 py-1 rounded-full w-fit uppercase tracking-wider text-indigo-300">
                {project.category}
              </span>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-white drop-shadow-2xl">
                {project.title}
              </h1>
              
              <div className="flex flex-wrap gap-4 mt-2">
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noopener noreferrer" className="hero-link primary">
                      <Play size={18} className="icon" /> Live Demo
                    </a>
                  )}
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="hero-link secondary">
                      <Code size={18} className="icon" /> GitHub Repository
                    </a>
                  )}
              </div>
            </div>
          </section>
                    </a>
                  )}
              </div>
            </div>
          </section>

          {/* ── DEMO VIDEO (reduced size, centered) ─────────────────────── */}
          {project.video && (
            <section className="section-cinema">
              <div className="mx-auto max-w-7xl">
                <div className="mb-10 px-2">
                  <h2 className="text-3xl font-bold tracking-tight">Interactive <span className="text-indigo-400">Walkthrough</span></h2>
                  <div className="mt-2 h-1 w-20 bg-indigo-500 rounded-full" />
                </div>
                {/* 75% width container, centered */}
                <div className="mx-auto" style={{ maxWidth: "75%" }}>
                  <div className="relative aspect-video rounded-2xl border border-white/10 bg-[#171b27] overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.5)]">
                    <video 
                      controls
                      className="w-full h-full object-cover"
                      poster={project.image}
                    >
                      <source src={project.video} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* ── SCREENSHOTS ROW (Task 1-4 Enforcement) ──────────────────── */}
          <section className="screenshot-section">
            <div className="mb-8 px-4">
              <h2 className="text-3xl font-bold tracking-tight text-white/90">Visual <span className="text-indigo-400">Library</span></h2>
              <div className="mt-2 h-1 w-20 bg-indigo-500 rounded-full" />
            </div>
            
            <div className="screenshot-row no-scrollbar px-4">
              {project.screenshots && project.screenshots.length > 0 ? (
                project.screenshots.map((img, idx) => (
                  <motion.div
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className="screenshot-card group cursor-pointer"
                  >
                    <img src={img} alt={`${project.title} screenshot ${idx + 1}`} />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f131e]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.div>
                ))
              ) : (
                [1, 2, 3].map((idx) => (
                  <div key={idx} className="screenshot-card flex items-center justify-center text-indigo-300/20 font-display italic text-xs">
                    Screenshot Pending
                  </div>
                ))
              )}
            </div>
          </section>

          {/* ── STRUCTURED DESCRIPTION ───────────────────────────────────── */}
          <section className="section-cinema">
            <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-16">
              {/* Main content — 2/3 */}
              <div className="lg:col-span-2 prose-cinema space-y-2">
                {/* Project Overview */}
                <div>
                  <h3 className="text-2xl font-bold !mt-0">Project <span className="text-indigo-400">Overview</span></h3>
                  <p className="text-lg leading-relaxed">{parsed.summary}</p>
                </div>

                {/* Key Highlights */}
                {parsed.highlights.length > 0 && (
                  <div>
                    <h4 className="text-xl font-bold flex items-center gap-2">
                      <Zap size={20} className="text-indigo-400" /> Key Highlights
                    </h4>
                    <ul>
                      {parsed.highlights.map((h, i) => (
                        <li key={i}>
                          {h.title && <strong className="text-slate-200">{h.title}</strong>}
                          {h.title && h.detail && <span className="text-slate-500"> — </span>}
                          {h.detail && <span>{h.detail}</span>}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Impact */}
                {parsed.impact.length > 0 && (
                  <div>
                    <h4 className="text-xl font-bold flex items-center gap-2">
                      <Target size={20} className="text-emerald-400" /> Impact
                    </h4>
                    <ul>
                      {parsed.impact.map((line, i) => (
                        <li key={i}>{line}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Sidebar — 1/3 */}
              <aside className="space-y-8">
                {/* Highlight Cards */}
                <div className="space-y-4">
                  <div className="highlight-card" style={{ borderLeftColor: "#6C8CFF" }}>
                    <Shield className="mb-3 text-indigo-400" size={24} />
                    <h4 className="font-bold text-base mb-1.5">Resilient Core</h4>
                    <p className="text-sm text-slate-400 leading-relaxed">High-performance architecture built for scale and mission-critical workloads.</p>
                  </div>
                  <div className="highlight-card" style={{ borderLeftColor: "#A855F7" }}>
                    <Cpu className="mb-3 text-violet-400" size={24} />
                    <h4 className="font-bold text-base mb-1.5">AI-Optimized</h4>
                    <p className="text-sm text-slate-400 leading-relaxed">Zero-latency inference paths and specialized model architectures.</p>
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="p-6 rounded-2xl glass-card tech-stack-section">
                  <h3 className="mb-2 flex items-center gap-2 text-lg font-bold">
                    <Layers className="text-indigo-400" size={20} /> Tech Stack
                  </h3>
                  <TechStack tech={project.tech} />
                </div>

                {/* Quick Links */}
                <div className="p-6 rounded-2xl glass-card">
                  <h3 className="mb-4 text-lg font-bold">Quick Links</h3>
                  <div className="hero-links">
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="hero-link secondary w-full justify-center">
                        <Code size={16} className="icon" /> GitHub
                      </a>
                    )}
                    {project.live && (
                      <a href={project.live} target="_blank" rel="noopener noreferrer" className="hero-link secondary w-full justify-center">
                        <ExternalLink size={16} className="icon" /> Demo
                      </a>
                    )}
                  </div>
                </div>
              </aside>
            </div>
          </section>

          {/* ── BOTTOM NAV CTA ──────────────────────────────────────────── */}
          <section className="py-24 px-8 text-center bg-gradient-to-b from-transparent to-[#0a0e19]">
            <motion.div
              whileHover={{ y: -10 }}
              className="inline-block"
            >
              <button 
                onClick={() => router.push("/")}
                className="group flex flex-col items-center gap-4"
              >
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-indigo-500/20 group-hover:border-indigo-500/40 transition-all">
                  <ArrowLeft size={32} className="group-hover:-translate-x-2 transition-transform" />
                </div>
                <span className="text-xs uppercase tracking-[0.3em] text-slate-500 group-hover:text-indigo-400 transition-colors">Return to Showcase</span>
              </button>
            </motion.div>
          </section>
        </motion.div>
      </AnimatePresence>

      <SiteFooter />
      <Lightbox 
        image={selectedImage} 
        onClose={() => setSelectedImage(null)} 
      />
    </div>
  );
}
