"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => setVisible(false), 400);
          return 100;
        }
        return p + Math.random() * 12 + 4;
      });
    }, 80);
    return () => clearInterval(interval);
  }, []);

  const [stars] = useState<{
    left: string;
    top: string;
    width: string;
    height: string;
    opacity: number;
    duration: number;
    delay: number;
  }[]>(() =>
    Array.from({ length: 40 }).map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      width: `${Math.random() * 2 + 1}px`,
      height: `${Math.random() * 2 + 1}px`,
      opacity: Math.random() * 0.5 + 0.1,
      duration: Math.random() * 3 + 1,
      delay: Math.random() * 2,
    }))
  );

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-[#0B0F1A]"
        >
          {/* Stars */}
          <div className="absolute inset-0 overflow-hidden">
            {stars.map((star, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white"
                style={{
                  left: star.left,
                  top: star.top,
                  width: star.width,
                  height: star.height,
                  opacity: star.opacity,
                }}
                animate={{ opacity: [0.1, 0.6, 0.1] }}
                transition={{ duration: star.duration, repeat: Infinity, delay: star.delay }}
              />
            ))}
          </div>

          {/* Center content */}
          <div className="relative z-10 flex flex-col items-center gap-8">
            {/* Animated logo ring */}
            <div className="relative w-20 h-20">
              <motion.div
                className="absolute inset-0 rounded-full border border-[#6C8CFF]/30"
                animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="absolute inset-2 rounded-full border border-[#A855F7]/40"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display text-2xl gradient-text">T</span>
              </div>
            </div>

            {/* Name */}
            <div className="text-center">
              <p className="font-display text-xs tracking-[0.5em] uppercase text-white/30 mb-1">Loading</p>
              <h1 className="font-display text-2xl tracking-[0.3em] text-white/80">TARUN YADAV</h1>
            </div>

            {/* Progress bar */}
            <div className="w-48 h-px bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#6C8CFF] to-[#A855F7]"
                style={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>

            <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/20">
              {Math.min(Math.round(progress), 100)}%
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
