"use client";

import { useParams, useRouter } from "next/navigation";
import { useMemo, useState, useEffect } from "react";
import { allCertificates } from "@/stitch_new_project (1)/utils/siteContent";
import { motion, AnimatePresence } from "framer-motion";
import SiteNavbar from "@/stitch_new_project (1)/components/SiteNavbar";
import SiteFooter from "@/stitch_new_project (1)/components/SiteFooter";
import Lightbox from "@/stitch_new_project (1)/components/Lightbox";
import { ExternalLink, ArrowLeft, Award, Calendar, Building2 } from "lucide-react";

export default function CertificatePage() {
  const { id } = useParams();
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const certificate = useMemo(() => allCertificates.find((c) => c.id === id), [id]);

  if (!certificate) {
    return (
      <div className="flex items-center justify-center bg-[#0f131e] text-white">
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
    <div style={{ paddingTop: '140px' }} className="mt-8 relative z-10 font-body selection:bg-indigo-500/30">

      {/* HERO SECTION */}
      <section className="relative w-full px-8 pb-16">
        <div className="max-w-5xl mx-auto flex flex-col gap-6">

          {/* CATEGORY */}
          <span className="text-xs border border-indigo-400/20 bg-indigo-400/10 px-4 py-1 rounded-full w-fit uppercase tracking-wider text-indigo-200">
            Certificate
          </span>

          {/* TITLE */}
          <h1 className="text-4xl md:text-6xl font-bold leading-tight text-white">
            {certificate.title}
          </h1>

          {/* ACTION BUTTONS */}
          <div className="flex flex-wrap gap-4 mt-2">
            {certificate.link && (
              <a 
                href={certificate.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full bg-indigo-500/20 border border-indigo-500/40 backdrop-blur-md hover:bg-indigo-500/30 transition flex items-center gap-2 text-white"
              >
                <ExternalLink size={18} /> View Certificate
              </a>
            )}
          </div>

        </div>
      </section>

      {/* REST OF PAGE */}
      <div className="px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={certificate.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Certificate Preview */}
            <section className="py-16">
              <div className="mb-12">
                <h2 className="text-3xl font-bold tracking-tight text-white">Certificate <span className="text-indigo-400">Preview</span></h2>
                <div className="mt-2 h-1 w-20 bg-indigo-500 rounded-full" />
              </div>
              <div className="relative rounded-3xl border border-white/10 bg-[#171b27] overflow-hidden shadow-2xl max-w-[900px] mx-auto">
                <img 
                  src={certificate.image} 
                  alt={certificate.title}
                  className="w-full h-auto object-cover cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => setActiveIndex(0)}
                />
              </div>
            </section>

            {/* Details Section */}
            <section className="py-16 grid grid-cols-1 md:grid-cols-3 gap-16 max-w-7xl mx-auto">
              <div className="md:col-span-2 space-y-12">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-white">Certificate <span className="text-indigo-400">Overview</span></h3>
                  <p className="text-lg text-slate-400 leading-relaxed">
                    {certificate.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-8 rounded-2xl bg-[#171b27] border border-white/5 border-l-4 border-l-indigo-500">
                    <Award className="mb-4 text-indigo-400" size={28} />
                    <h4 className="font-bold text-lg mb-2 text-white">Professional Recognition</h4>
                    <p className="text-sm text-slate-400">Industry-recognized certification validating expertise and skills.</p>
                  </div>
                  <div className="p-8 rounded-2xl bg-[#171b27] border border-white/5 border-l-4 border-l-violet-500">
                    <Building2 className="mb-4 text-violet-400" size={28} />
                    <h4 className="font-bold text-lg mb-2 text-white">Issued By</h4>
                    <p className="text-sm text-slate-400">{certificate.issuer} - A leading authority in the field.</p>
                  </div>
                </div>
              </div>

              <aside className="space-y-12">
                <div className="p-8 rounded-3xl bg-indigo-500/5 border border-indigo-500/10 backdrop-blur-3xl">
                  <h3 className="mb-6 flex items-center gap-2 text-xl font-bold text-white">
                    <Award className="text-indigo-400" size={24} /> Certification Details
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                      <span className="text-slate-400 text-sm">Issuer</span>
                      <span className="text-white font-medium text-sm">{certificate.issuer}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                      <span className="text-slate-400 text-sm">Date</span>
                      <span className="text-white font-medium text-sm">{certificate.date}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-slate-400 text-sm">ID</span>
                      <span className="text-white font-medium text-xs">{certificate.id}</span>
                    </div>
                  </div>
                </div>

                {certificate.link && (
                  <div className="p-8 rounded-3xl bg-[#171b27] border border-white/5">
                    <h3 className="mb-4 text-xl font-bold text-white">Verification</h3>
                    <p className="text-sm italic text-slate-500 mb-6">
                      Verify this certificate on the official issuer platform.
                    </p>
                    <a
                      href={certificate.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                      <ExternalLink size={20} />
                      <span className="font-medium">Verify Certificate</span>
                    </a>
                  </div>
                )}
              </aside>
            </section>
          </motion.div>
        </AnimatePresence>
      </div>

      <SiteFooter />
      <Lightbox 
        images={[certificate.image]} 
        activeIndex={activeIndex} 
        onClose={() => setActiveIndex(null)} 
        onNext={() => {}}
        onPrev={() => {}}
      />
    </div>
  );
}
