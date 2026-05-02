"use client";

import { useParams, useRouter } from "next/navigation";
import { useMemo, useState, useEffect } from "react";
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
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const project = useMemo(() => openSourceProjects.find((p) => p.id === id), [id]);

  console.log("DEBUG: GitHub Project Data:", project);
  console.log("DEBUG: Hero Video URL:", project?.heroVideo);
  const parsed = useMemo(() => project ? parseDescription(project.description) : null, [project]);

  if (!project || !parsed) {
    return (
      <div className="flex items-center justify-center bg-[#0f131e] text-white">
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
    <div style={{ paddingTop: '140px' }} className="mt-8 relative z-10 font-body selection:bg-indigo-500/30">

      {/* HERO SECTION */}
      <section className="relative w-full px-6 sm:px-8 lg:px-12 xl:px-20 pb-12 lg:pb-16">
        <div className="max-w-5xl mx-auto flex flex-col gap-5 sm:gap-6">

          {/* CATEGORY */}
          <span className="text-xs border border-violet-500/30 bg-violet-500/20 px-3 py-1 rounded-full w-fit uppercase tracking-wider text-violet-300">
            Open Source
          </span>

          {/* TITLE */}
          <h1 className="text-4xl md:text-6xl font-bold leading-tight text-white">
            {project.title}
          </h1>

          {/* ACTION BUTTONS */}
          <div className="flex flex-wrap gap-4 mt-2">
            {project.github && (
              <a 
                href={project.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-violet-500/20 border border-violet-500/40 backdrop-blur-md hover:bg-violet-500/30 transition flex items-center gap-2 text-white"
              >
                <Code size={18} /> View on GitHub
              </a>
            )}
          </div>

        </div>
      </section>

      {/* REST OF PAGE */}
      <div className="px-6 sm:px-8 lg:px-12 xl:px-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* PROJECT PREVIEW */}
            <section className="py-12 lg:py-16">
              <div className="mb-8 lg:mb-10 px-4">
                <h2 className="text-3xl font-bold tracking-tight text-white">Project <span className="text-violet-400">Preview</span></h2>
                <div className="mt-2 h-1 w-20 bg-violet-500 rounded-full" />
              </div>
              <div className="flex justify-center px-4 mb-16">
                <div className="relative rounded-2xl border border-white/10 bg-[#171b27] overflow-hidden shadow-2xl w-full max-w-[80vw]">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-auto object-cover cursor-pointer hover:opacity-90 transition-opacity" 
                    onClick={() => setActiveIndex(-1)}
                  />
                </div>
              </div>

              {/* SCREENSHOT GALLERY */}
              {project.screenshots && project.screenshots.length > 0 && (
                <div className="px-4">
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-white/80">Visual <span className="text-violet-400">Gallery</span></h3>
                  </div>
                  <div className="screenshot-row no-scrollbar">
                    {project.screenshots.map((img, index) => (
                      <div 
                        key={index} 
                        className="screenshot-card cursor-pointer group relative z-10"
                        onClick={() => {
                          setActiveIndex(index);
                        }}
                      >
                        <img src={img} alt="screenshot" className="relative z-0" />
                        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors pointer-events-none" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* STRUCTURED DESCRIPTION */}
            <section className="py-12 lg:py-16">
              <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-16">
                <div className="lg:col-span-2 prose-cinema space-y-2 max-w-2xl">
                  <div>
                    <h3 className="text-2xl font-bold !mt-0 text-white">Project <span className="text-violet-400">Overview</span></h3>
                    <p className="text-lg leading-relaxed text-slate-300">{parsed.summary}</p>
                  </div>
                  {parsed.highlights.length > 0 && (
                    <div className="pt-8">
                      <h4 className="text-xl font-bold flex items-center gap-2 text-white">
                        <Zap size={20} className="text-violet-400" /> Key Highlights
                      </h4>
                      <ul className="mt-4 space-y-2">
                        {parsed.highlights.map((h, i) => (
                          <li key={i} className="text-slate-400">
                            {h.title && <strong className="text-slate-200">{h.title}</strong>}
                            {h.title && h.detail && <span className="text-slate-500"> — </span>}
                            {h.detail && <span>{h.detail}</span>}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {parsed.impact.length > 0 && (
                    <div className="pt-8">
                      <h4 className="text-xl font-bold flex items-center gap-2 text-white">
                        <Target size={20} className="text-emerald-400" /> Impact
                      </h4>
                      <ul className="mt-4 space-y-2">
                        {parsed.impact.map((line, i) => (
                          <li key={i} className="text-slate-400">{line}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <aside className="space-y-6 lg:space-y-8">
                  <div className="space-y-4">
                    <div className="highlight-card p-6 rounded-xl bg-white/5 border-l-4 border-violet-500">
                      <Code className="mb-3 text-violet-400" size={24} />
                      <h4 className="font-bold text-base mb-1.5 text-white">Open Source</h4>
                      <p className="text-sm text-slate-400 leading-relaxed">Available on GitHub for contribution and review.</p>
                    </div>
                    <div className="highlight-card p-6 rounded-xl bg-white/5 border-l-4 border-indigo-500">
                      <Layers className="mb-3 text-indigo-400" size={24} />
                      <h4 className="font-bold text-base mb-1.5 text-white">Modern Stack</h4>
                      <p className="text-sm text-slate-400 leading-relaxed">Built with modern tools and production-grade frameworks.</p>
                    </div>
                  </div>
                  <div className="p-6 sm:p-7 rounded-2xl glass-card border border-white/10 bg-white/5">
                    <h3 className="mb-2 flex items-center gap-2 text-lg font-bold text-white">
                      <Layers className="text-violet-400" size={20} /> Tech Stack
                    </h3>
                    <TechStack tech={project.tech} />
                  </div>
                  {project.github && (
                    <div className="p-6 rounded-2xl glass-card border border-white/10 bg-white/5">
                      <h3 className="mb-4 text-lg font-bold text-violet-400">Repository</h3>
                      <p className="text-sm text-slate-500 mb-6 leading-relaxed">View the source code and contribute.</p>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition text-white text-sm"
                      >
                        <Code size={16} /> Source Code
                      </a>
                    </div>
                  )}
                </aside>
              </div>
            </section>
          </motion.div>
        </AnimatePresence>
      </div>

      <SiteFooter />
      <Lightbox 
        images={activeIndex === -1 ? [project.image] : (project.screenshots || [])} 
        activeIndex={activeIndex === -1 ? 0 : activeIndex} 
        onClose={() => setActiveIndex(null)} 
        onNext={() => {
          if (activeIndex === -1) return;
          setActiveIndex((prev) => (prev! + 1) % (project.screenshots?.length || 1));
        }}
        onPrev={() => {
          if (activeIndex === -1) return;
          setActiveIndex((prev) => (prev! - 1 + (project.screenshots?.length || 1)) % (project.screenshots?.length || 1));
        }}
      />
    </div>
  );
}
