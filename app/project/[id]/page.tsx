"use client";

import { useParams, useRouter } from "next/navigation";
import { useMemo, useState, useEffect } from "react";
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
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const project = useMemo(() => featuredProjects.find((p) => p.id === id), [id]);
  const parsed = useMemo(() => project ? parseDescription(project.description) : null, [project]);

  console.log("PROJECT:", project);

  useEffect(() => {
    console.log("ACTIVE INDEX CHANGED:", activeIndex);
  }, [activeIndex]);

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
      <section className="relative w-full px-8 pb-16">
        <div className="max-w-5xl mx-auto flex flex-col gap-6">

          {/* CATEGORY */}
          <span className="text-xs border px-3 py-1 rounded-full w-fit uppercase tracking-wider opacity-80">
            {project.category}
          </span>

          {/* TITLE */}
          <h1 className="text-4xl md:text-6xl font-bold leading-tight text-white">
            {project.title}
          </h1>

          {/* ACTION BUTTONS */}
          <div className="flex flex-wrap gap-4 mt-2">
            {project.live && (
              <a 
                href={project.live} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-indigo-500/20 border border-indigo-500/40 backdrop-blur-md hover:bg-indigo-500/30 transition flex items-center gap-2 text-white"
              >
                <Play size={18} /> Live Demo
              </a>
            )}

            {project.github && (
              <a 
                href={project.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full border border-white/20 backdrop-blur-md hover:bg-white/10 transition flex items-center gap-2 text-white"
              >
                <Code size={18} /> GitHub Repository
              </a>
            )}
          </div>

        </div>
      </section>

      {/* REST OF PAGE */}
      <div className="px-8">
        <div>
          <div key={project.id}>
            {/* DEMO VIDEO */}
            {project.video && (
              <section className="py-16">
                <div className="mx-auto max-w-7xl">
                  <div className="mb-10 px-2">
                    <h2 className="text-3xl font-bold tracking-tight text-white">Interactive <span className="text-indigo-400">Walkthrough</span></h2>
                    <div className="mt-2 h-1 w-20 bg-indigo-500 rounded-full" />
                  </div>
                  <div className="mx-auto w-full max-w-[75vw]">
                    <div className="relative aspect-video rounded-2xl border border-white/10 bg-[#171b27] shadow-[0_20px_80px_rgba(0,0,0,0.5)]">
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

            {/* SCREENSHOTS */}
            <section className="py-16">
              <div className="mb-8 px-4">
                <h2 className="text-3xl font-bold tracking-tight text-white/90">Visual <span className="text-indigo-400">Library</span></h2>
                <div className="mt-2 h-1 w-20 bg-indigo-500 rounded-full" />
              </div>

              <div className="screenshot-row no-scrollbar px-4">
                {project.screenshots && project.screenshots.length > 0 ? (
                  project.screenshots.map((img, idx) => (
                    <motion.div
                      key={idx}
                      onClick={() => {
                        setActiveIndex(idx);
                      }}
                      className="screenshot-card group cursor-pointer relative z-10"
                    >
                      <img src={img} alt={`${project.title} screenshot ${idx + 1}`} className="relative z-0" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0f131e]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
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

            {/* STRUCTURED DESCRIPTION */}
            <section className="py-16">
              <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-16">
                <div className="lg:col-span-2 prose-cinema space-y-2">
                  <div>
                    <h3 className="text-2xl font-bold !mt-0 text-white">Project <span className="text-indigo-400">Overview</span></h3>
                    <p className="text-lg leading-relaxed text-slate-300">{parsed.summary}</p>
                  </div>
                  {parsed.highlights.length > 0 && (
                    <div className="pt-8">
                      <h4 className="text-xl font-bold flex items-center gap-2 text-white">
                        <Zap size={20} className="text-indigo-400" /> Key Highlights
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
                <aside className="space-y-8">
                  <div className="space-y-4">
                    <div className="highlight-card p-6 rounded-xl bg-white/5 border-l-4 border-indigo-500">
                      <Shield className="mb-3 text-indigo-400" size={24} />
                      <h4 className="font-bold text-base mb-1.5 text-white">Resilient Core</h4>
                      <p className="text-sm text-slate-400 leading-relaxed">High-performance architecture built for scale and mission-critical workloads.</p>
                    </div>
                    <div className="highlight-card p-6 rounded-xl bg-white/5 border-l-4 border-violet-500">
                      <Cpu className="mb-3 text-violet-400" size={24} />
                      <h4 className="font-bold text-base mb-1.5 text-white">AI-Optimized</h4>
                      <p className="text-sm text-slate-400 leading-relaxed">Zero-latency inference paths and specialized model architectures.</p>
                    </div>
                  </div>
                  <div className="p-6 rounded-2xl glass-card border border-white/10 bg-white/5">
                    <h3 className="mb-2 flex items-center gap-2 text-lg font-bold text-white">
                      <Layers className="text-indigo-400" size={20} /> Tech Stack
                    </h3>
                    <TechStack tech={project.tech} />
                  </div>
                  <div className="p-6 rounded-2xl glass-card border border-white/10 bg-white/5">
                    <h3 className="mb-4 text-lg font-bold text-white">Quick Links</h3>
                    <div className="flex flex-col gap-3">
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition text-white text-sm">
                          <Code size={16} /> GitHub
                        </a>
                      )}
                      {project.live && (
                        <a href={project.live} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition text-white text-sm">
                          <ExternalLink size={16} /> Demo
                        </a>
                      )}
                    </div>
                  </div>
                </aside>
              </div>
            </section>
          </div>
        </div>
      </div>

      <SiteFooter />
      <Lightbox
        images={project.screenshots || []}
        activeIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
        onNext={() => setActiveIndex((prev) => (prev! + 1) % (project.screenshots?.length || 1))}
        onPrev={() => setActiveIndex((prev) => (prev! - 1 + (project.screenshots?.length || 1)) % (project.screenshots?.length || 1))}
      />
    </div>
  );
}
