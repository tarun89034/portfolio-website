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
          backgroundColor: "rgba(0, 0, 0, 0.9)",
          backdropFilter: "blur(8px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px"
        }}
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute top-8 right-8 z-[1000000] bg-white/10 backdrop-blur-md px-6 py-2 rounded-lg hover:bg-white/20 text-white font-medium transition-all"
        >
          ✕ Close
        </button>

        {/* IMAGE — FULLSCREEN STYLE */}
        <div 
          className="relative flex items-center justify-center" 
          onClick={(e) => e.stopPropagation()}
          style={{ width: '100%', height: '100%' }}
        >
          <img
            src={images[activeIndex]}
            alt={`Preview ${activeIndex + 1}`}
            style={{
              maxWidth: "95vw",
              maxHeight: "90vh",
              objectFit: "contain",
              borderRadius: "8px",
              boxShadow: "0 0 50px rgba(0,0,0,0.5)"
            }}
          />
          
          {/* SUBTLE COUNTER */}
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-white/50 text-xs font-mono tracking-widest">
            {activeIndex + 1} / {images.length}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}
