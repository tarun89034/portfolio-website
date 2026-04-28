"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

type LightboxProps = {
  images?: string[];
  activeIndex?: number | null;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  image?: string | null;
};

export default function Lightbox({ 
  images: propImages, 
  activeIndex: propActiveIndex, 
  onClose,
  image: propImage 
}: LightboxProps) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const images = propImages || (propImage ? [propImage] : []);
  const activeIndex = propActiveIndex !== undefined ? propActiveIndex : (propImage ? 0 : null);

  console.log("LIGHTBOX RENDER ATTEMPT:", { mounted, activeIndex, imagesLength: images.length });

  // KEYBOARD SUPPORT (ESC to close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!mounted || activeIndex === null || images.length === 0) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="lightbox-modal"
        data-hide-cursor="true"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 999999,
          backgroundColor: "rgba(0, 0, 0, 0.95)",
          backdropFilter: "blur(16px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* CLOSE BUTTON — VIEWPORT FIXED ANCHOR */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="fixed top-6 right-6 z-[1000001] bg-white/5 backdrop-blur-2xl px-6 py-2.5 rounded-2xl border border-white/10 text-white/90 text-sm font-semibold tracking-wide transition-all hover:bg-white/15 hover:text-white hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] active:scale-95"
          style={{ position: 'fixed' }}
        >
          ✕ Close
        </button>

        {/* IMAGE WRAPPER — CENTERED CONTENT */}
        <div 
          onClick={(e) => e.stopPropagation()}
          className="relative flex flex-col items-center justify-center p-12"
        >
          <img
            src={images[activeIndex]}
            alt={`Preview ${activeIndex + 1}`}
            style={{
              maxWidth: "70vw",
              maxHeight: "70vh",
              objectFit: "contain",
              borderRadius: "20px",
              boxShadow: "0 40px 120px rgba(0,0,0,1)"
            }}
          />
          
          {/* SUBTLE COUNTER */}
          <div className="mt-10 text-white/30 text-[10px] font-mono tracking-[0.3em] uppercase">
            Frame {activeIndex + 1} / {images.length}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}
