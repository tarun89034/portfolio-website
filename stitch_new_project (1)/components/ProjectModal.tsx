"use client";

import { useEffect } from "react";
import styles from "../styles/project-modal.module.css";
import { useAnimatedPresence } from "../utils/useAnimatedPresence";
import { useBodyScrollLock } from "../utils/useBodyScrollLock";
import ProjectModalMedia from "./ProjectModalMedia";
import ProjectModalContent from "./ProjectModalContent";
import type { ProjectItem } from "../utils/siteContent";

const EXIT_MS = 280;

interface ProjectModalProps {
  item: ProjectItem | null;
  isOpen: boolean;
  onClose: () => void;
  onExited?: () => void;
}

export default function ProjectModal({ item, isOpen, onClose, onExited }: ProjectModalProps) {
  const shouldRender = useAnimatedPresence(Boolean(isOpen && item), EXIT_MS, onExited);
  useBodyScrollLock(isOpen);

  useEffect(() => {
    if (!isOpen) return;

    const onEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onEsc);

    return () => {
      window.removeEventListener("keydown", onEsc);
    };
  }, [isOpen, onClose]);

  if (!item || !shouldRender) return null;

  return (
    <div className={`${styles.overlay} ${isOpen ? styles.open : ""}`} onClick={onClose} aria-hidden={!isOpen}>
      <div className={styles.panel} onClick={(event) => event.stopPropagation()}>
        <button type="button" className={styles.close} onClick={onClose} aria-label="Close project modal">
          X
        </button>

        <ProjectModalMedia item={item} />
        <ProjectModalContent item={item} />
      </div>
    </div>
  );
}
