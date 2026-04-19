"use client";

import { useEffect, useState } from "react";

export function useParallaxScroll(factor = 0.2, max = 120) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let rafId = 0;

    const onScroll = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        const value = Math.min(window.scrollY * factor, max);
        setOffset(value);
        rafId = 0;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [factor, max]);

  return offset;
}
