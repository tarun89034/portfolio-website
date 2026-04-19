"use client";

import { useParams, useRouter } from "next/navigation";
import { useMemo } from "react";
import { featuredProjects } from "@/stitch_new_project (1)/utils/siteContent";
import { motion, AnimatePresence } from "framer-motion";
import SiteNavbar from "@/stitch_new_project (1)/components/SiteNavbar";
import SiteFooter from "@/stitch_new_project (1)/components/SiteFooter";
import { Play, ExternalLink, ArrowLeft, Layers, Shield, Cpu, Code } from "lucide-react";

export default function ProjectPage() {
  const { id } = useParams();
  const router = useRouter();
  const project = useMemo(() => featuredProjects.find((p) => p.id === id), [id]);

  if (!project) {
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
          {/* Hero Section */}
          <section className="relative h-[85vh] w-full flex items-center overflow-hidden">
            <div className="absolute inset-0 z-0 bg-[#0f131e]">
              <img 
                src={project.image} 
                alt=""
                className="absolute inset-0 w-full h-full object-cover opacity-50"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0f131e] via-[#0f131e]/70 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#0f131e] to-transparent" />
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
                <h1 className="mb-6 font-display text-6xl font-black tracking-tighter md:text-8xl">
                  {project.title.split(' ').map((word, i) => (
                    <span key={i} className={i % 2 === 1 ? "text-indigo-400" : ""}>{word} </span>
                  ))}
                </h1>
                <p className="max-w-2xl text-lg text-slate-300 leading-relaxed md:text-xl">
                  {project.description}
                </p>

                <div className="mt-10 flex flex-wrap gap-6">
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

          {/* Demo Video Section */}
          {project.video && (
            <section className="mx-auto max-w-7xl px-8 py-24 md:px-16">
              <div className="mb-12">
                <h2 className="text-3xl font-bold tracking-tight">Interactive <span className="text-indigo-400">Walkthrough</span></h2>
                <div className="mt-2 h-1 w-20 bg-indigo-500 rounded-full" />
              </div>
              <div className="relative aspect-video rounded-3xl border border-white/10 bg-[#171b27] overflow-hidden shadow-2xl">
                <video 
                  controls
                  className="w-full h-full object-cover"
                  poster={project.image}
                >
                  <source src={project.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </section>
          )}

          {/* Screenshot Row Section */}
          <section className="space-y-10 py-12 overflow-hidden">
            <div className="px-8 md:px-24">
              <h2 className="text-3xl font-bold tracking-tight text-white/90">Visual <span className="text-indigo-400">Library</span></h2>
            </div>
            
            <div className="flex gap-8 overflow-x-auto px-8 md:px-24 no-scrollbar pb-10">
              {project.images.map((img, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  className="flex-none w-[400px] aspect-video relative rounded-2xl overflow-hidden border border-white/5 bg-[#171b27] group"
                >
                  <img src={img} alt={`${project.title} screenshot ${idx}`} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f131e]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              ))}
              {/* Fallback if no images are provided yet */}
              {project.images.length === 0 && (
                [1, 2, 3].map((idx) => (
                  <div key={idx} className="flex-none w-[400px] aspect-video rounded-2xl bg-indigo-500/5 border border-white/5 flex items-center justify-center text-indigo-300/30 font-display italic">
                    Cinematic Placeholder {idx}
                  </div>
                ))
              )}
            </div>
          </section>

          {/* Details & Tech Stack Section */}
          <section className="mx-auto max-w-7xl px-8 py-24 md:px-16 grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="md:col-span-2 space-y-12">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold">Project <span className="text-indigo-400">Overview</span></h3>
                <p className="text-lg text-slate-400 leading-relaxed">
                  {project.description} Deep dive into the methodology, architectural choices, and the impact this system delivered.
                  Designed with scalability and cinematic immersion at its core.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-8 rounded-2xl bg-[#171b27] border border-white/5 border-l-4 border-l-indigo-500">
                  <Shield className="mb-4 text-indigo-400" size={28} />
                  <h4 className="font-bold text-lg mb-2">Resilient Core</h4>
                  <p className="text-sm text-slate-400">High-performance architecture built to handle massive scale and mission-critical workloads.</p>
                </div>
                <div className="p-8 rounded-2xl bg-[#171b27] border border-white/5 border-l-4 border-l-violet-500">
                  <Cpu className="mb-4 text-violet-400" size={28} />
                  <h4 className="font-bold text-lg mb-2">AI-Optimized</h4>
                  <p className="text-sm text-slate-400">Zero-latency inference paths and specialized model architectures for specific domain tasks.</p>
                </div>
              </div>
            </div>

            <aside className="space-y-12">
              <div className="p-8 rounded-3xl bg-indigo-500/5 border border-indigo-500/10 backdrop-blur-3xl">
                <h3 className="mb-6 flex items-center gap-2 text-xl font-bold">
                  <Layers className="text-indigo-400" size={24} /> Tech Stack
                </h3>
                <div className="flex flex-wrap gap-3">
                  {project.tech.map((t, idx) => (
                    <span 
                      key={idx}
                      className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-slate-300 transition-colors hover:border-indigo-400/40 hover:text-indigo-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-8 rounded-3xl bg-[#171b27] border border-white/5">
                <h3 className="mb-4 text-xl font-bold">Inspiration</h3>
                <p className="text-sm italic text-slate-500">
                  &quot;Building intelligent systems that feel like magic.&quot;
                </p>
                <div className="mt-6 flex gap-4">
                  <a href={project.github || "#"} className="text-slate-400 hover:text-indigo-400 transition-colors"><Code size={20} /></a>
                  <a href={project.live || "#"} className="text-slate-400 hover:text-indigo-400 transition-colors"><ExternalLink size={20} /></a>
                </div>
              </div>
            </aside>
          </section>

          {/* Bottom CTA for navigation */}
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
    </div>
  );
}
