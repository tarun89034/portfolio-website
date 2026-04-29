"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, ArrowLeft, ArrowRight } from "lucide-react";

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
  onNext,
  onPrev,
  image: propImage,
}: LightboxProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // KEYBOARD SUPPORT (Arrows + ESC)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && onNext) onNext();
      if (e.key === "ArrowLeft" && onPrev) onPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onNext, onPrev]);

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
  if (!isOpen) return null;

  const isFirst = activeIndex === 0;
  const isLast = activeIndex === images.length - 1;

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
        {/* SHRINK-WRAP CONTAINER (Everything anchored here) */}
        <div style={{ position: "relative", display: "inline-flex", lineHeight: 0 }}>
          {/* IMAGE */}
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

          {/* CLOSE BUTTON — TOP RIGHT */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
              zIndex: 1000001,
              background: "rgba(0, 0, 0, 0.5)",
              backdropFilter: "blur(20px)",
              padding: "10px",
              borderRadius: "50%",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              color: "white",
              cursor: "pointer",
              transition: "all 0.2s",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 20px rgba(0,0,0,0.3)"
            }}
            title="Close (Esc)"
          >
            <X size={20} />
          </button>

          {/* LEFT ARROW */}
          {images.length > 1 && (
            <button
              disabled={isFirst}
              onClick={(e) => {
                e.stopPropagation();
                onPrev?.();
              }}
              style={{
                position: "absolute",
                left: "16px",
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 1000001,
                background: "rgba(0, 0, 0, 0.5)",
                backdropFilter: "blur(20px)",
                padding: "12px",
                borderRadius: "50%",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                color: "white",
                cursor: isFirst ? "not-allowed" : "pointer",
                opacity: isFirst ? 0.2 : 0.7,
                transition: "all 0.2s",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: isFirst ? "none" : "auto"
              }}
              className="hover:opacity-100 hover:scale-110 active:scale-95"
            >
              <ArrowLeft size={24} />
            </button>
          )}

          {/* RIGHT ARROW */}
          {images.length > 1 && (
            <button
              disabled={isLast}
              onClick={(e) => {
                e.stopPropagation();
                onNext?.();
              }}
              style={{
                position: "absolute",
                right: "16px",
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 1000001,
                background: "rgba(0, 0, 0, 0.5)",
                backdropFilter: "blur(20px)",
                padding: "12px",
                borderRadius: "50%",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                color: "white",
                cursor: isLast ? "not-allowed" : "pointer",
                opacity: isLast ? 0.2 : 0.7,
                transition: "all 0.2s",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: isLast ? "none" : "auto"
              }}
              className="hover:opacity-100 hover:scale-110 active:scale-95"
            >
              <ArrowRight size={24} />
            </button>
          )}
        </div>

        {/* IMAGE COUNTER */}
        <div
          style={{
            marginTop: "32px",
            color: "rgba(255, 255, 255, 0.5)",
            fontSize: "12px",
            fontFamily: "monospace",
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            fontWeight: 500
          }}
        >
          Image {activeIndex + 1} / {images.length}
        </div>
      </div>
    </div>,
    document.body
  );
}
