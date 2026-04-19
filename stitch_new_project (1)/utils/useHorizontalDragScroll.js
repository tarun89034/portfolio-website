"use client";

import { useRef } from "react";

export function useHorizontalDragScroll(ref) {
  const stateRef = useRef({ isDragging: false, startX: 0, startLeft: 0 });

  const onPointerDown = (event) => {
    const node = ref.current;
    if (!node) return;

    stateRef.current.isDragging = true;
    stateRef.current.startX = event.clientX;
    stateRef.current.startLeft = node.scrollLeft;

    node.setPointerCapture(event.pointerId);
    node.style.scrollSnapType = "none";
    node.style.cursor = "grabbing";
  };

  const onPointerMove = (event) => {
    const node = ref.current;
    if (!node || !stateRef.current.isDragging) return;

    const delta = event.clientX - stateRef.current.startX;
    node.scrollLeft = stateRef.current.startLeft - delta;
  };

  const endDrag = (event) => {
    const node = ref.current;
    if (!node) return;

    stateRef.current.isDragging = false;
    if (event.pointerId !== undefined) {
      try {
        node.releasePointerCapture(event.pointerId);
      } catch {
        // no-op
      }
    }

    node.style.scrollSnapType = "x mandatory";
    node.style.cursor = "grab";
  };

  return {
    onPointerDown,
    onPointerMove,
    onPointerUp: endDrag,
    onPointerCancel: endDrag,
  };
}
