"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = ["Work", "Skills", "About", "Contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setOpen(false);
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0B0F1A]/80 backdrop-blur-xl border-b border-[rgba(108,140,255,0.1)] py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          className="font-display text-sm md:text-base tracking-[0.3em] text-white/90 cursor-pointer select-none"
          whileHover={{ scale: 1.03 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <span className="gradient-text font-bold">TARUN</span>
          <span className="text-white/60 font-light"> YADAV</span>
        </motion.div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className="font-body text-sm tracking-widest uppercase text-white/50 hover:text-white transition-colors duration-300 relative group"
            >
              {link}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-[#6C8CFF] to-[#A855F7] group-hover:w-full transition-all duration-400" />
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="https://www.linkedin.com/in/tarun-yadav-a5b538251/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/40 hover:text-white/80 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a
            href="https://github.com/tarun89034/tarun89034"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/40 hover:text-white/80 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
          <motion.a
            href="/resume.pdf"
            download
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="ml-2 px-5 py-2 text-xs tracking-widest uppercase font-body glass-card rounded-full text-[#6C8CFF] border border-[#6C8CFF]/30 hover:border-[#6C8CFF]/70 hover:bg-[#6C8CFF]/10 transition-all duration-300"
          >
            Resume
          </motion.a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden w-8 h-8 flex flex-col justify-center items-end gap-1.5"
          onClick={() => setOpen(!open)}
        >
          <span className={`block h-px bg-white/70 transition-all duration-300 ${open ? "w-6 rotate-45 translate-y-2" : "w-6"}`} />
          <span className={`block h-px bg-white/70 transition-all duration-300 ${open ? "opacity-0 w-4" : "w-4"}`} />
          <span className={`block h-px bg-white/70 transition-all duration-300 ${open ? "w-6 -rotate-45 -translate-y-2" : "w-6"}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0B0F1A]/95 backdrop-blur-xl border-t border-white/5"
          >
            <div className="flex flex-col px-8 py-6 gap-6">
              {navLinks.map((link) => (
                <button
                  key={link}
                  onClick={() => scrollTo(link)}
                  className="text-left font-body text-lg text-white/70 hover:text-white transition-colors tracking-widest uppercase"
                >
                  {link}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
