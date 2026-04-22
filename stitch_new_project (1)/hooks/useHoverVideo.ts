import { useState, useRef, useEffect } from "react";

export function useHoverVideo(delay = 400) {
  const [isHovered, setIsHovered] = useState(false);
  const [shouldShowVideo, setShouldShowVideo] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const onMouseEnter = () => {
    setIsHovered(true);
    timerRef.current = setTimeout(() => {
      setShouldShowVideo(true);
    }, delay);
  };

  const onMouseLeave = () => {
    setIsHovered(false);
    setShouldShowVideo(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return { isHovered, shouldShowVideo, onMouseEnter, onMouseLeave };
}
