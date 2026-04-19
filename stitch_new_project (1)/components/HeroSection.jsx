"use client";

import { useEffect, useRef, useState } from "react";
import FloatingParticles from "./FloatingParticles";
import ResumeDownloadButton from "./ResumeDownloadButton";
import { useParallaxScroll } from "../utils/useParallaxScroll";
import { useAudio } from "./AudioContext";
import styles from "../styles/hero-section.module.css";

const HERO_MEDIA_SRC = "/stitch/Anime_Cityscape_Loop_Generation.mp4";

export default function HeroSection() {
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const mediaOffset = useParallaxScroll(0.25, 140);
  const contentOffset = useParallaxScroll(0.12, 70);
  const { isMuted, toggleMute, registerMedia } = useAudio();

  useEffect(() => {
    const t = setTimeout(() => setIsReady(true), 120);
    return () => {
      clearTimeout(t);
    };
  }, []);

  useEffect(() => {
    if (!videoRef.current || !audioRef.current) return;
    return registerMedia(videoRef.current, audioRef.current);
  }, [registerMedia]);

  const scrollToProjects = () => {
    document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className={styles.root} id="hero">
      <div className={styles.ambientA} />
      <div className={styles.ambientB} />

      <div className={styles.media} style={{ transform: `translateY(${mediaOffset}px)` }}>
        <video
          ref={videoRef}
          className={styles.video}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-label="Background cinematic hero video"
        >
          <source src={HERO_MEDIA_SRC} type="video/mp4" />
        </video>
        <audio ref={audioRef} loop muted preload="none" aria-hidden>
          <source src={HERO_MEDIA_SRC} type="audio/mp4" />
        </audio>
        <div className={styles.overlay} />
        <div className={styles.vignette} />
      </div>

      <FloatingParticles className={styles.particles} />

      <div
        className={`${styles.content} ${isReady ? styles.ready : ""}`}
        style={{ transform: `translateY(${-contentOffset}px)` }}
      >
        <div className={`${styles.statusChip} ${isReady ? styles.reveal1 : ""}`}>
          <span className={styles.statusDot} />
          Available for projects
        </div>
        <h1 className={styles.title}>
          TARUN <span>YADAV</span>
        </h1>
        <p className={`${styles.subtitle} ${isReady ? styles.reveal2 : ""}`}>AI Engineer | ML Systems | GenAI</p>
        <p className={`${styles.tagline} ${isReady ? styles.reveal3 : ""}`}>&ldquo;Building intelligent systems that feel like magic&rdquo;</p>

        <div className={`${styles.actions} ${isReady ? styles.reveal4 : ""}`}>
          <button type="button" className={`${styles.btn} ${styles.primary}`} onClick={scrollToProjects}>
            View Work
          </button>
          <ResumeDownloadButton className={`${styles.btn} ${styles.ghost}`} />
        </div>
      </div>

      <button
        type="button"
        className={styles.mute}
        onClick={toggleMute}
        aria-label={isMuted ? "Unmute media" : "Mute media"}
      >
        {isMuted ? "Unmute" : "Mute"}
      </button>

      <div className={`${styles.scrollCue} ${isReady ? styles.reveal4 : ""}`}>
        <span>Scroll</span>
        <i />
      </div>
    </section>
  );
}
