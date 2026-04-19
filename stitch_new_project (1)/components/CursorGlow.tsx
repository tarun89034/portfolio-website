"use client";

import { useEffect, useState, useRef } from "react";

export default function CursorGlow() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button, [role="button"], [data-cursor]');
      setIsHovering(!!interactive);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden"
      aria-hidden="true"
    >
      {/* Custom Circular Cursor */}
      <div
        ref={cursorRef}
        className="fixed rounded-full border-2 border-indigo-400/50 bg-indigo-400/10 backdrop-blur-sm transition-transform duration-200 ease-out will-change-transform"
        style={{
          left: mousePos.x,
          top: mousePos.y,
          width: isHovering ? 40 : 20,
          height: isHovering ? 40 : 20,
          transform: `translate(-50%, -50%) scale(${isVisible ? 1 : 0})`,
          opacity: isVisible ? 1 : 0,
          boxShadow: isHovering 
            ? '0 0 20px rgba(108, 140, 255, 0.5), 0 0 40px rgba(168, 85, 247, 0.3)' 
            : '0 0 10px rgba(108, 140, 255, 0.3)',
        }}
      />
      
      {/* Glow Effect */}
      <div
        ref={glowRef}
        className="fixed rounded-full transition-all duration-300 ease-out will-change-transform"
        style={{
          left: mousePos.x,
          top: mousePos.y,
          width: isHovering ? 80 : 50,
          height: isHovering ? 80 : 50,
          transform: `translate(-50%, -50%) scale(${isVisible ? 1 : 0})`,
          opacity: isVisible ? 0.6 : 0,
          background: isHovering
            ? 'radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, rgba(108, 140, 255, 0.1) 70%, transparent 100%)'
            : 'radial-gradient(circle, rgba(108, 140, 255, 0.3) 0%, rgba(108, 140, 255, 0) 70%)',
          filter: 'blur(20px)',
        }}
      />
    </div>
  );
}

