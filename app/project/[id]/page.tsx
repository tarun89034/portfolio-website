"use client";

import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { featuredProjects } from "@/stitch_new_project (1)/utils/siteContent";
import { parseDescription } from "@/stitch_new_project (1)/utils/descriptionParser";
import { motion, AnimatePresence } from "framer-motion";
import SiteNavbar from "@/stitch_new_project (1)/components/SiteNavbar";
import SiteFooter from "@/stitch_new_project (1)/components/SiteFooter";
import Lightbox from "@/stitch_new_project (1)/components/Lightbox";
import { Play, ExternalLink, ArrowLeft, Layers, Shield, Cpu, Code, Zap, Target } from "lucide-react";

export default function ProjectPage() {
  const { id } = useParams();
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const project = useMemo(() => featuredProjects.find((p) => p.id === id), [id]);
  const parsed = useMemo(() => project ? parseDescription(project.description) : null, [project]);
  
  console.log("Project Data:", project);
  console.log("Screenshots:", project?.screenshots);

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
    <div className="min-h-screen bg-[#0f131e] text-[#dfe2f2] font-body selection:bg-indigo-500/30">
      <SiteNavbar />
      
      <AnimatePresence mode="wait">
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* ── HERO: Title + Tag + Buttons only ────────────────────────── */}
          <section className="relative h-[75vh] w-full flex items-center overflow-hidden">
            <div className="absolute inset-0 z-0 bg-[#0f131e]">
              <img 
                src={project.image} 
                alt=""
                className="absolute inset-0 w-full h-full object-cover opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0f131e] via-[#0f131e]/80 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#0f131e] to-transparent" />
            </div>

            <div className="relative z-10 px-8 md:px-24 max-w-5xl">
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                onClick={() => router.back()}
                className="mb-8 flex items-center gap-2 text-sm uppercase tracking-widest text-indigo-300 transition-colors hover:text-indigo-100"
              >
                <ArrowLeft size={16} /> Back to Projects
              </motion.button>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <span className="mb-4 inline-block rounded-full border border-indigo-400/20 bg-indigo-400/10 px-4 py-1 text-[10px] uppercase tracking-[0.2em] text-indigo-200">
                  {project.category}
                </span>
                <h1 className="mb-8 font-display text-6xl font-black tracking-tighter md:text-8xl">
                  {project.title.split(' ').map((word, i) => (
                    <span key={i} className={i % 2 === 1 ? "text-indigo-400" : ""}>{word} </span>
                  ))}
                </h1>

                <div className="mt-10 flex flex-wrap gap-5">
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-600 px-8 py-4 font-bold text-white transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(108,140,255,0.4)]"
                    >
                      <Play size={20} fill="currentColor" /> Live Demo
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-8 py-4 font-bold text-white backdrop-blur-md transition-all hover:bg-white/10"
                    >
                      <Code size={20} /> GitHub Repository
                    </a>
                  )}
                </div>
              </motion.div>
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
                <div className="p-6 rounded-2xl glass-card">
                  <h3 className="mb-5 flex items-center gap-2 text-lg font-bold">
                    <Layers className="text-indigo-400" size={20} /> Tech Stack
                  </h3>
                  <div className="flex flex-wrap gap-2.5">
                    {project.tech.map((t, idx) => (
                      <span 
                        key={idx}
                        className="px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-slate-300 transition-colors hover:border-indigo-400/40 hover:text-indigo-400"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Quick Links */}
                <div className="p-6 rounded-2xl glass-card">
                  <h3 className="mb-3 text-lg font-bold">Quick Links</h3>
                  <div className="flex flex-col gap-3">
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-slate-400 hover:text-indigo-400 transition-colors">
                        <Code size={16} /> GitHub Repository
                      </a>
                    )}
                    {project.live && (
                      <a href={project.live} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-slate-400 hover:text-indigo-400 transition-colors">
                        <ExternalLink size={16} /> Live Demo
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
        </motion.main>
      </AnimatePresence>

      <SiteFooter />
      <Lightbox 
        image={selectedImage} 
        onClose={() => setSelectedImage(null)} 
      />
    </div>
  );
}
