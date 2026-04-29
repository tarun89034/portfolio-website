"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 250 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleHoverState = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Interactive Check
      const interactive = target.closest("a, button, [role='button'], .interactive");
      setIsHovering(!!interactive);

      // Hidden Check (Screenshots & Modal)
      const hideSource = target.closest(".screenshot-card, .lightbox-modal, [data-hide-cursor='true']");
      setIsHidden(!!hideSource);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleHoverState);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleHoverState);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        className="custom-cursor-dot"
        style={{
          left: springX,
          top: springY,
          display: isHidden ? "none" : "block",
          pointerEvents: "none"
        }}
      />
      <motion.div
        className="custom-cursor-ring"
        style={{
          left: springX,
          top: springY,
          display: isHidden ? "none" : "block",
          pointerEvents: "none"
        }}
        animate={{
          scale: isHovering ? 2.5 : 1,
          borderColor: isHovering ? "rgba(168, 85, 247, 0.8)" : "rgba(108, 140, 255, 0.5)",
          backgroundColor: isHovering ? "rgba(168, 85, 247, 0.1)" : "transparent",
        }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
      />
    </>
  );
}
