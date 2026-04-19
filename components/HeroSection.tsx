"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import AnimeCityBackground from "./AnimeCityBackground";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  alpha: number;
  color: string;
}

function FloatingParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Particle[] = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -Math.random() * 0.5 - 0.1,
      r: Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.5 + 0.1,
      color: Math.random() > 0.5 ? "108, 140, 255" : "168, 85, 247",
    }));

    let raf: number;
    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -10) { p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
        ctx.fill();

        // Glow
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
        grd.addColorStop(0, `rgba(${p.color}, ${p.alpha * 0.4})`);
        grd.addColorStop(1, "transparent");
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
        ctx.fill();
      });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 2 }} />;
}

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 300);
    return () => clearTimeout(t);
  }, []);

  const scrollToWork = () => {
    document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={ref}
      id="hero"
      className="relative w-full h-screen min-h-[700px] overflow-hidden flex items-center"
    >
      {/* Animated Background */}
      <AnimeCityBackground />
      <FloatingParticles />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F1A]/20 via-transparent to-[#0B0F1A]" style={{ zIndex: 3 }} />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F1A]/70 via-transparent to-transparent" style={{ zIndex: 3 }} />

      {/* Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full"
      >
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="font-mono text-xs tracking-[0.25em] uppercase text-green-400/80">
              Available for Work
            </span>
          </motion.div>

          {/* Name */}
          <div className="overflow-hidden mb-4">
            <motion.h1
              initial={{ y: 120, opacity: 0 }}
              animate={loaded ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[clamp(3rem,10vw,8rem)] leading-none tracking-tight text-white glow-text"
            >
              TARUN
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-6">
            <motion.h1
              initial={{ y: 120, opacity: 0 }}
              animate={loaded ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[clamp(3rem,10vw,8rem)] leading-none tracking-tight gradient-text"
            >
              YADAV
            </motion.h1>
          </div>

          {/* Subtitle line */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={loaded ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex items-center gap-4 mb-4"
          >
            <div className="w-12 h-px bg-gradient-to-r from-[#6C8CFF] to-[#A855F7]" />
            <p className="font-mono text-sm md:text-base tracking-[0.2em] uppercase text-[#6C8CFF]/90">
              AI Engineer · ML Systems · GenAI
            </p>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.85 }}
            className="font-body text-lg md:text-xl text-white/50 italic mb-12 max-w-xl leading-relaxed"
          >
            &ldquo;Building intelligent systems that feel like magic&rdquo;
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={loaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-wrap gap-4"
          >
            <motion.button
              onClick={scrollToWork}
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(108,140,255,0.4)" }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#6C8CFF] to-[#A855F7] rounded-full font-body font-medium text-sm tracking-widest uppercase text-white shadow-lg shadow-[#6C8CFF]/20 transition-all"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
              View Work
            </motion.button>

            <motion.a
              href="/resume.pdf"
              download
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-3 px-8 py-4 glass-card rounded-full font-body font-medium text-sm tracking-widest uppercase text-white/80 border border-white/10 hover:border-[#6C8CFF]/40 hover:text-white transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download Resume
            </motion.a>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={loaded ? { opacity: 1 } : {}}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/30">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-10 bg-gradient-to-b from-white/20 to-transparent"
        />
      </motion.div>
    </section>
  );
}
