"use client";

import { useEffect, useState } from "react";

export function useInViewOnce(ref, options = { threshold: 0.2, rootMargin: "120px" }) {
  const [inView, setInView] = useState(false);
  const threshold = options.threshold ?? 0.2;
  const rootMargin = options.rootMargin ?? "120px";

  useEffect(() => {
    const node = ref.current;
    if (!node || inView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setInView(true);
        observer.disconnect();
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [inView, ref, rootMargin, threshold]);

  return inView;
}
