"use client";

import { useParams, useRouter } from "next/navigation";
import { useMemo } from "react";
import { openSourceProjects } from "@/stitch_new_project (1)/utils/siteContent";
import { motion, AnimatePresence } from "framer-motion";
import SiteNavbar from "@/stitch_new_project (1)/components/SiteNavbar";
import SiteFooter from "@/stitch_new_project (1)/components/SiteFooter";
import { ExternalLink, ArrowLeft, Code, Code2, Layers } from "lucide-react";

export default function GitHubProjectPage() {
  const { id } = useParams();
  const router = useRouter();
  const project = useMemo(() => openSourceProjects.find((p) => p.id === id), [id]);

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
                <span className="mb-4 inline-block rounded-full border border-violet-400/20 bg-violet-400/10 px-4 py-1 text-[10px] uppercase tracking-[0.2em] text-violet-200">
                  Open Source
                </span>
                <h1 className="mb-6 font-display text-6xl font-black tracking-tighter md:text-8xl">
                  {project.title.split(' ').map((word, i) => (
                    <span key={i} className={i % 2 === 1 ? "text-violet-400" : ""}>{word} </span>
                  ))}
                </h1>
                <div className="flex items-center gap-6 mb-6">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Code2 size={20} className="text-violet-400" />
                    <span className="text-lg">{project.category}</span>
                  </div>
                </div>

                <div className="mt-10 flex flex-wrap gap-6">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 rounded-full bg-gradient-to-r from-violet-500 to-violet-600 px-8 py-4 font-bold text-white transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]"
                    >
                      <Code size={20} /> View on GitHub
                    </a>
                  )}
                </div>
              </motion.div>
            </div>
          </section>

          {/* Project Image Section */}
          <section className="mx-auto max-w-7xl px-8 py-24 md:px-16">
            <div className="mb-12">
              <h2 className="text-3xl font-bold tracking-tight">Project <span className="text-violet-400">Preview</span></h2>
              <div className="mt-2 h-1 w-20 bg-violet-500 rounded-full" />
            </div>
            <div className="relative rounded-3xl border border-white/10 bg-[#171b27] overflow-hidden shadow-2xl">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-auto object-cover"
              />
            </div>
          </section>

          {/* Details Section */}
          <section className="mx-auto max-w-7xl px-8 py-24 md:px-16 grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="md:col-span-2 space-y-12">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold">Project <span className="text-violet-400">Overview</span></h3>
                <p className="text-lg text-slate-400 leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-8 rounded-2xl bg-[#171b27] border border-white/5 border-l-4 border-l-violet-500">
                  <Code className="mb-4 text-violet-400" size={28} />
                  <h4 className="font-bold text-lg mb-2">Open Source</h4>
                  <p className="text-sm text-slate-400">Available on GitHub for contribution and review.</p>
                </div>
                <div className="p-8 rounded-2xl bg-[#171b27] border border-white/5 border-l-4 border-l-indigo-500">
                  <Layers className="mb-4 text-indigo-400" size={28} />
                  <h4 className="font-bold text-lg mb-2">Technology</h4>
                  <p className="text-sm text-slate-400">Built with modern tools and frameworks.</p>
                </div>
              </div>
            </div>

            <aside className="space-y-12">
              <div className="p-8 rounded-3xl bg-violet-500/5 border border-violet-500/10 backdrop-blur-3xl">
                <h3 className="mb-6 flex items-center gap-2 text-xl font-bold">
                  <Code className="text-violet-400" size={24} /> Project Details
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-slate-400">Category</span>
                    <span className="text-white font-medium">{project.category}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-slate-400">Type</span>
                    <span className="text-white font-medium">Open Source</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-slate-400">ID</span>
                    <span className="text-white font-medium text-sm">{project.id}</span>
                  </div>
                </div>
              </div>

              {project.github && (
                <div className="p-8 rounded-3xl bg-[#171b27] border border-white/5">
                  <h3 className="mb-4 text-xl font-bold">Repository</h3>
                  <p className="text-sm italic text-slate-500 mb-6">
                    View the source code and contribute to this project.
                  </p>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-violet-400 hover:text-violet-300 transition-colors"
                  >
                    <ExternalLink size={20} />
                    <span>View on GitHub</span>
                  </a>
                </div>
              )}
            </aside>
          </section>

          {/* Tech Stack Section */}
          <section className="mx-auto max-w-7xl px-8 py-24 md:px-16">
            <div className="mb-12">
              <h2 className="text-3xl font-bold tracking-tight">Tech <span className="text-violet-400">Stack</span></h2>
              <div className="mt-2 h-1 w-20 bg-violet-500 rounded-full" />
            </div>
            <div className="flex flex-wrap gap-4">
              {project.tech.map((tech, i) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="px-6 py-3 rounded-full bg-[#171b27] border border-white/10 text-slate-300 hover:border-violet-500/50 hover:text-violet-300 transition-all"
                >
                  {tech}
                </motion.div>
              ))}
            </div>
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
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-violet-500/20 group-hover:border-violet-500/40 transition-all">
                  <ArrowLeft size={32} className="group-hover:-translate-x-2 transition-transform" />
                </div>
                <span className="text-xs uppercase tracking-[0.3em] text-slate-500 group-hover:text-violet-400 transition-colors">Return to Gallery</span>
              </button>
            </motion.div>
          </section>
        </motion.main>
      </AnimatePresence>

      <SiteFooter />
    </div>
  );
}
