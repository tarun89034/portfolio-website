"use client";

import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { openSourceProjects } from "@/stitch_new_project (1)/utils/siteContent";
import { parseDescription } from "@/stitch_new_project (1)/utils/descriptionParser";
import { motion, AnimatePresence } from "framer-motion";
import SiteNavbar from "@/stitch_new_project (1)/components/SiteNavbar";
import SiteFooter from "@/stitch_new_project (1)/components/SiteFooter";
import Lightbox from "@/stitch_new_project (1)/components/Lightbox";
import TechStack from "@/stitch_new_project (1)/components/TechStack";
import { ExternalLink, ArrowLeft, Code, Code2, Layers, Zap, Target } from "lucide-react";

export default function GitHubProjectPage() {
  const { id } = useParams();
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const project = useMemo(() => openSourceProjects.find((p) => p.id === id), [id]);

  console.log("DEBUG: GitHub Project Data:", project);
  console.log("DEBUG: Hero Video URL:", project?.heroVideo);
  const parsed = useMemo(() => project ? parseDescription(project.description) : null, [project]);

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
    <div key={project.id} className="min-h-screen font-body selection:bg-indigo-500/30 pt-20">
      
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* ── HERO: Fixed Layering and Height ────────────────────────── */}
          {/* ── COMPACT HERO HEADER ────────────────────────── */}
          <section className="relative w-full overflow-hidden flex items-start py-16 px-8">
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

            <div className="max-w-5xl flex flex-col gap-4 relative z-10 w-full">
              <button
                onClick={() => router.back()}
                className="text-sm opacity-80 hover:opacity-100 transition flex items-center gap-2 w-fit text-violet-300 uppercase tracking-widest"
              >
                <ArrowLeft size={16} /> Back to Projects
              </button>

              <span className="text-xs border border-violet-500/30 bg-violet-500/20 px-3 py-1 rounded-full w-fit uppercase tracking-wider text-violet-300">
                Open Source
              </span>
              
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-white drop-shadow-2xl mt-2">
                {project.title.split(' ').map((word, i) => (
                  <span key={i} className={i % 2 === 1 ? "text-violet-400" : ""}>{word} </span>
                ))}
              </h1>

              <div className="flex items-center gap-2 text-slate-300 mb-2 mt-1">
                <Code2 size={20} className="text-violet-400" />
                <span className="text-lg">{project.category}</span>
              </div>
              
              <div className="flex flex-wrap gap-4 mt-2">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="hero-link primary">
                      <Code size={18} className="icon" /> View on GitHub
                    </a>
                  )}
              </div>
            </div>
          </section>

          {/* ── PROJECT PREVIEW (Task 1-5 Enforcement) ──────────────────── */}
          <section className="screenshot-section">
            <div className="mb-10 px-4">
              <h2 className="text-3xl font-bold tracking-tight">Project <span className="text-violet-400">Preview</span></h2>
              <div className="mt-2 h-1 w-20 bg-violet-500 rounded-full" />
            </div>
            <div className="flex justify-center px-4 mb-16">
              <button 
                onClick={() => setSelectedImage(project.image)}
                className="screenshot-card !w-[600px] !h-[375px] group"
              >
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="github-card-img" 
                />
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors" />
              </button>
            </div>

            {/* ── SCREENSHOT GALLERY (Task 6 Enforcement) ────────────────── */}
            {project.screenshots && project.screenshots.length > 0 && (
              <div className="px-4">
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-white/80">Visual <span className="text-violet-400">Gallery</span></h3>
                </div>
                <div className="screenshot-row no-scrollbar">
                  {project.screenshots.map((img, index) => (
                    <div 
                      key={index} 
                      className="screenshot-card cursor-pointer group"
                      onClick={() => setSelectedImage(img)}
                    >
                      <img src={img} alt="screenshot" />
                      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* ── STRUCTURED DESCRIPTION ───────────────────────────────────── */}
          <section className="section-cinema">
            <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-16">
              {/* Main content — 2/3 */}
              <div className="lg:col-span-2 prose-cinema space-y-2">
                {/* Project Overview */}
                <div>
                  <h3 className="text-2xl font-bold !mt-0">Project <span className="text-violet-400">Overview</span></h3>
                  <p className="text-lg leading-relaxed">{parsed.summary}</p>
                </div>

                {/* Key Highlights */}
                {parsed.highlights.length > 0 && (
                  <div>
                    <h4 className="text-xl font-bold flex items-center gap-2">
                      <Zap size={20} className="text-violet-400" /> Key Highlights
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
                  <div className="highlight-card" style={{ borderLeftColor: "#A855F7" }}>
                    <Code className="mb-3 text-violet-400" size={24} />
                    <h4 className="font-bold text-base mb-1.5">Open Source</h4>
                    <p className="text-sm text-slate-400 leading-relaxed">Available on GitHub for contribution and review.</p>
                  </div>
                  <div className="highlight-card" style={{ borderLeftColor: "#6C8CFF" }}>
                    <Layers className="mb-3 text-indigo-400" size={24} />
                    <h4 className="font-bold text-base mb-1.5">Modern Stack</h4>
                    <p className="text-sm text-slate-400 leading-relaxed">Built with modern tools and production-grade frameworks.</p>
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="p-6 rounded-2xl glass-card tech-stack-section">
                  <h3 className="mb-2 flex items-center gap-2 text-lg font-bold">
                    <Layers className="text-violet-400" size={20} /> Tech Stack
                  </h3>
                  <TechStack tech={project.tech} />
                </div>

                {/* Repository Link */}
                {project.github && (
                  <div className="p-6 rounded-2xl glass-card">
                    <h3 className="mb-4 text-lg font-bold text-violet-400">Repository</h3>
                    <p className="text-sm text-slate-500 mb-6 leading-relaxed">View the source code and contribute.</p>
                    <div className="hero-links">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hero-link secondary w-full justify-center group"
                      >
                        <Code size={16} className="icon" /> Source Code
                      </a>
                    </div>
                  </div>
                )}
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
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-violet-500/20 group-hover:border-violet-500/40 transition-all">
                  <ArrowLeft size={32} className="group-hover:-translate-x-2 transition-transform" />
                </div>
                <span className="text-xs uppercase tracking-[0.3em] text-slate-500 group-hover:text-violet-400 transition-colors">Return to Gallery</span>
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
