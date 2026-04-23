"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import MediaCard from "./MediaCard";
import styles from "../styles/project-row.module.css";
import { useInViewOnce } from "../utils/useInViewOnce";
import type { ProjectItem, CertificateItem } from "../utils/siteContent";
import type { MediaType } from "../utils/content.types";

interface ProjectRowProps {
  title: string;
  items: ProjectItem[] | CertificateItem[];
  type?: MediaType;
  onOpenLightbox?: (image: string) => void;
}

export default function ProjectRow({ title, items = [], type = "project", onOpenLightbox }: ProjectRowProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const isActive = useInViewOnce(rowRef);
  const visibleItems = useMemo(() => (isActive ? items : []), [isActive, items]);
  const [scrollState, setScrollState] = useState({ left: false, right: true });

  useEffect(() => {
    const node = rowRef.current;
    if (!node) return;

    const syncState = () => {
      const left = node.scrollLeft > 6;
      const right = node.scrollLeft + node.clientWidth < node.scrollWidth - 6;
      setScrollState({ left, right });
    };

    syncState();
    node.addEventListener("scroll", syncState, { passive: true });
    window.addEventListener("resize", syncState);

    return () => {
      node.removeEventListener("scroll", syncState);
      window.removeEventListener("resize", syncState);
    };
  }, [visibleItems.length]);

  const scrollByAmount = (direction: number) => {
    const node = rowRef.current;
    if (!node) return;
    const amount = Math.round(node.clientWidth * 0.82);
    node.scrollBy({ left: direction * amount, behavior: "smooth" });
  };

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.controls}>
          <button
            type="button"
            onClick={() => scrollByAmount(-1)}
            className={styles.control}
            aria-label={`Scroll ${title} left`}
            disabled={!scrollState.left}
          >
            &#8592;
          </button>
          <button
            type="button"
            onClick={() => scrollByAmount(1)}
            className={styles.control}
            aria-label={`Scroll ${title} right`}
            disabled={!scrollState.right}
          >
            &#8594;
          </button>
        </div>
      </div>

      <div
        ref={rowRef}
        className="row-netflix no-scrollbar"
      >
        {visibleItems.map((item, index) => (
          <MediaCard
            key={item.id || `${item.title}-${index}`}
            item={item}
            type={type}
            index={index}
            onOpenLightbox={onOpenLightbox}
          />
        ))}
      </div>

      <div className={`${styles.fadeEdge} ${styles.fadeLeft} ${scrollState.left ? styles.show : ""}`} />
      <div className={`${styles.fadeEdge} ${styles.fadeRight} ${scrollState.right ? styles.show : ""}`} />
    </section>
  );
}
