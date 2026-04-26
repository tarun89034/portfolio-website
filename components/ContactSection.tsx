"use client";
import { motion } from "framer-motion";

interface Personal {
  email: string;
  linkedin: string;
  github: string;
}

export default function ContactSection({ personal }: { personal: Personal }) {
  return (
    <section id="contact" className="py-32 px-6 md:px-16 relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(108,140,255,0.08) 0%, transparent 70%)" }} />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(108,140,255,0.2)] to-transparent" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Label */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-8 h-px bg-gradient-to-r from-transparent to-[#6C8CFF]" />
            <span className="font-mono text-xs tracking-[0.3em] uppercase text-[#6C8CFF]/70">Get in Touch</span>
            <div className="w-8 h-px bg-gradient-to-l from-transparent to-[#6C8CFF]" />
          </div>

          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-white mb-6 leading-none">
            Let&apos;s Build the<br />
            <span className="gradient-text">Future Together</span>
          </h2>

          <p className="font-body text-white/40 text-lg max-w-lg mx-auto mb-14 leading-relaxed">
            Currently open to AI engineering roles and high-impact collaborations.
            If you&apos;re building something meaningful, let&apos;s talk.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <motion.a
              href={`mailto:${personal.email}`}
              whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(108,140,255,0.3)" }}
              whileTap={{ scale: 0.97 }}
              className="px-10 py-4 bg-gradient-to-r from-[#6C8CFF] to-[#A855F7] rounded-full font-body font-medium text-sm tracking-widest uppercase text-white transition-all"
            >
              Send a Message
            </motion.a>

            <div className="flex items-center gap-3">
              <motion.a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="btn w-12 h-12 glass-card rounded-full flex items-center justify-center text-white/50 hover:text-[#6C8CFF] border border-white/10 hover:border-[#6C8CFF]/40 transition-all"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </motion.a>
              <motion.a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                className="btn w-12 h-12 glass-card rounded-full flex items-center justify-center text-white/50 hover:text-white border border-white/10 hover:border-white/30 transition-all"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
              </motion.a>
            </div>
          </div>

          {/* Email display */}
          <div className="flex items-center justify-center gap-3 text-white/20">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-white/10" />
            <span className="font-mono text-xs tracking-wider">{personal.email}</span>
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-white/10" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
