"use client";

import { useParams, useRouter } from "next/navigation";
import { useMemo } from "react";
import { allCertificates } from "@/stitch_new_project (1)/utils/siteContent";
import { motion, AnimatePresence } from "framer-motion";
import SiteNavbar from "@/stitch_new_project (1)/components/SiteNavbar";
import SiteFooter from "@/stitch_new_project (1)/components/SiteFooter";
import { ExternalLink, ArrowLeft, Award, Calendar, Building2 } from "lucide-react";

export default function CertificatePage() {
  const { id } = useParams();
  const router = useRouter();
  const certificate = useMemo(() => allCertificates.find((c) => c.id === id), [id]);

  if (!certificate) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#0f131e] text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Certificate Not Found</h1>
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
    <div className="min-h-screen font-body selection:bg-indigo-500/30 pt-20">
      
      <AnimatePresence mode="wait">
        <motion.div
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
                src={certificate.image} 
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
                <ArrowLeft size={16} /> Back to Certificates
              </motion.button>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <span className="mb-4 inline-block rounded-full border border-indigo-400/20 bg-indigo-400/10 px-4 py-1 text-[10px] uppercase tracking-[0.2em] text-indigo-200">
                  Certificate
                </span>
                <h1 className="mb-6 font-display text-6xl font-black tracking-tighter md:text-8xl">
                  {certificate.title.split(' ').map((word, i) => (
                    <span key={i} className={i % 2 === 1 ? "text-indigo-400" : ""}>{word} </span>
                  ))}
                </h1>
                <div className="flex items-center gap-6 mb-6">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Building2 size={20} className="text-indigo-400" />
                    <span className="text-lg">{certificate.issuer}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <Calendar size={20} className="text-indigo-400" />
                    <span className="text-lg">{certificate.date}</span>
                  </div>
                </div>

                <div className="hero-links">
                  {certificate.link && (
                    <a
                      href={certificate.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hero-link primary group"
                    >
                      <ExternalLink size={18} className="icon" /> View Certificate
                    </a>
                  )}
                </div>
              </motion.div>
            </div>
          </section>

          {/* Full Certificate Image Section */}
          <section className="mx-auto max-w-7xl px-8 py-24 md:px-16">
            <div className="mb-12">
              <h2 className="text-3xl font-bold tracking-tight">Certificate <span className="text-indigo-400">Preview</span></h2>
              <div className="mt-2 h-1 w-20 bg-indigo-500 rounded-full" />
            </div>
            <div className="relative rounded-3xl border border-white/10 bg-[#171b27] overflow-hidden shadow-2xl">
              <img 
                src={certificate.image} 
                alt={certificate.title}
                className="w-full h-auto object-cover"
              />
            </div>
          </section>

          {/* Details Section */}
          <section className="mx-auto max-w-7xl px-8 py-24 md:px-16 grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="md:col-span-2 space-y-12">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold">Certificate <span className="text-indigo-400">Overview</span></h3>
                <p className="text-lg text-slate-400 leading-relaxed">
                  {certificate.description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-8 rounded-2xl bg-[#171b27] border border-white/5 border-l-4 border-l-indigo-500">
                  <Award className="mb-4 text-indigo-400" size={28} />
                  <h4 className="font-bold text-lg mb-2">Professional Recognition</h4>
                  <p className="text-sm text-slate-400">Industry-recognized certification validating expertise and skills.</p>
                </div>
                <div className="p-8 rounded-2xl bg-[#171b27] border border-white/5 border-l-4 border-l-violet-500">
                  <Building2 className="mb-4 text-violet-400" size={28} />
                  <h4 className="font-bold text-lg mb-2">Issued By</h4>
                  <p className="text-sm text-slate-400">{certificate.issuer} - A leading authority in the field.</p>
                </div>
              </div>
            </div>

            <aside className="space-y-12">
              <div className="p-8 rounded-3xl bg-indigo-500/5 border border-indigo-500/10 backdrop-blur-3xl">
                <h3 className="mb-6 flex items-center gap-2 text-xl font-bold">
                  <Award className="text-indigo-400" size={24} /> Certification Details
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-slate-400">Issuer</span>
                    <span className="text-white font-medium">{certificate.issuer}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/5">
                    <span className="text-slate-400">Date</span>
                    <span className="text-white font-medium">{certificate.date}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-slate-400">ID</span>
                    <span className="text-white font-medium text-sm">{certificate.id}</span>
                  </div>
                </div>
              </div>

              {certificate.link && (
                <div className="p-8 rounded-3xl bg-[#171b27] border border-white/5">
                  <h3 className="mb-4 text-xl font-bold">Verification</h3>
                  <p className="text-sm italic text-slate-500 mb-6">
                    Verify this certificate on the official issuer platform.
                  </p>
                  <a
                    href={certificate.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 transition-colors"
                  >
                    <ExternalLink size={20} />
                    <span>Verify Certificate</span>
                  </a>
                </div>
              )}
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
                <span className="text-xs uppercase tracking-[0.3em] text-slate-500 group-hover:text-indigo-400 transition-colors">Return to Gallery</span>
              </button>
            </motion.div>
          </section>
        </motion.div>
      </AnimatePresence>

      <SiteFooter />
    </div>
  );
}
