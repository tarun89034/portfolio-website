"use client";

import { useEffect, useState } from "react";

export function useAnimatedPresence(isOpen, durationMs, onExited) {
  const [isMounted, setIsMounted] = useState(Boolean(isOpen));

  if (isOpen && !isMounted) {
    setIsMounted(true);
  }

  useEffect(() => {
    if (isOpen || !isMounted) return;

    const timeoutId = window.setTimeout(() => {
      setIsMounted(false);
      if (onExited) onExited();
    }, durationMs);

    return () => window.clearTimeout(timeoutId);
  }, [durationMs, isMounted, isOpen, onExited]);

  return isMounted;
}
