"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const KONAMI = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];

export default function EasterEgg() {
  const [, setKeys] = useState<string[]>([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      setKeys((prev) => {
        const next = [...prev, e.key].slice(-KONAMI.length);
        if (next.join(",") === KONAMI.join(",")) {
          setShow(true);
          setTimeout(() => setShow(false), 4000);
        }
        return next;
      });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const [particles] = useState<{ x: number; y: number }[]>(() =>
    Array.from({ length: 20 }).map((_, i) => ({
      x: Math.cos((i / 20) * Math.PI * 2) * (150 + Math.random() * 100),
      y: Math.sin((i / 20) * Math.PI * 2) * (150 + Math.random() * 100),
    }))
  );

  return (
    <AnimatePresence>
      {show && (
        <motion.div
           initial={{ opacity: 0, scale: 0.5 }}
           animate={{ opacity: 1, scale: 1 }}
           exit={{ opacity: 0, scale: 0.5 }}
           className="fixed inset-0 z-[300] flex items-center justify-center pointer-events-none"
        >
          <div className="text-center">
            {/* Burst particles */}
            {particles.map((p, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  background: i % 2 === 0 ? "#6C8CFF" : "#A855F7",
                  left: "50%",
                  top: "50%",
                }}
                animate={{
                  x: p.x,
                  y: p.y,
                  opacity: [1, 0],
                  scale: [1, 0],
                }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            ))}
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5, repeat: 4 }}
              className="text-8xl mb-4"
            >
              🌟
            </motion.div>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="font-display text-2xl gradient-text tracking-widest"
            >
              You found it!
            </motion.p>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="font-mono text-sm text-white/40 mt-2 tracking-wider"
            >
              ↑ ↑ ↓ ↓ ← → ← → B A
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
