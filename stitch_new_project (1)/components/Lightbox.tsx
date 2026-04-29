"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
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
  image: propImage,
}: LightboxProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // KEYBOARD SUPPORT (ESC to close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const images = propImages || (propImage ? [propImage] : []);
  const activeIndex =
    propActiveIndex !== undefined
      ? propActiveIndex
      : propImage
        ? 0
        : null;

  // Don't render anything server-side
  if (!mounted) return null;

  const isOpen = activeIndex !== null && images.length > 0;

  // If not open, render NOTHING — no portal, no AnimatePresence, no ghost elements
  if (!isOpen) return null;

  return createPortal(
    <div
      onClick={onClose}
      className="lightbox-modal"
      data-hide-cursor="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999999,
        backgroundColor: "rgba(0, 0, 0, 0.95)",
        backdropFilter: "blur(16px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* CENTERING ENGINE */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        {/* SHRINK-WRAP CONTAINER */}
        <div style={{ position: "relative", display: "inline-block", lineHeight: 0 }}>
          {/* CLOSE BUTTON — ANCHORED TO IMAGE CORNER */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            style={{
              position: "absolute",
              top: "12px",
              right: "12px",
              zIndex: 1000001,
              background: "rgba(0, 0, 0, 0.5)",
              backdropFilter: "blur(16px)",
              padding: "8px",
              borderRadius: "9999px",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              color: "white",
              cursor: "pointer",
              transition: "all 0.2s",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            title="Close"
          >
            <X size={18} />
          </button>

          <img
            src={images[activeIndex]}
            alt={`Preview ${activeIndex + 1}`}
            style={{
              display: "block",
              maxWidth: "75vw",
              maxHeight: "75vh",
              objectFit: "contain",
              borderRadius: "16px",
              boxShadow: "0 30px 100px rgba(0,0,0,0.9)",
            }}
          />
        </div>

        {/* SUBTLE COUNTER */}
        <div
          style={{
            marginTop: "32px",
            color: "rgba(255, 255, 255, 0.3)",
            fontSize: "10px",
            fontFamily: "monospace",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
          }}
        >
          Frame {activeIndex + 1} / {images.length}
        </div>
      </div>
    </div>,
    document.body
  );
}
