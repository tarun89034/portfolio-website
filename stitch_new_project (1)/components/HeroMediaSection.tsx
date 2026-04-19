"use client";

import { useEffect, useRef, useState } from "react";
import styles from "../styles/hero.module.css";

const HERO_MEDIA_SRC = "/stitch/Anime_Cityscape_Loop_Generation.mp4";

export default function HeroMediaSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    const audio = audioRef.current;
    if (!video || !audio) {
      return;
    }

    const syncAudioToVideo = () => {
      if (Math.abs(audio.currentTime - video.currentTime) > 0.35) {
        audio.currentTime = video.currentTime;
      }
    };

    const handleVideoPlay = () => {
      if (!isMuted) {
        audio.currentTime = video.currentTime;
        void audio.play().catch(() => undefined);
      }
    };

    const handleVideoPause = () => {
      audio.pause();
    };

    video.addEventListener("timeupdate", syncAudioToVideo);
    video.addEventListener("seeking", syncAudioToVideo);
    video.addEventListener("play", handleVideoPlay);
    video.addEventListener("pause", handleVideoPause);

    return () => {
      video.removeEventListener("timeupdate", syncAudioToVideo);
      video.removeEventListener("seeking", syncAudioToVideo);
      video.removeEventListener("play", handleVideoPlay);
      video.removeEventListener("pause", handleVideoPause);
    };
  }, [isMuted]);

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    const video = videoRef.current;
    const audio = audioRef.current;

    setIsMuted(nextMuted);

    if (!video || !audio) {
      return;
    }

    video.muted = nextMuted;
    audio.muted = nextMuted;

    if (nextMuted) {
      audio.pause();
      return;
    }

    audio.currentTime = video.currentTime;
    void video.play().catch(() => undefined);
    void audio.play().catch(() => undefined);
  };

  const scrollToWork = () => {
    document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className={styles.heroSection}>
      <div className={styles.videoLayer}>
        <video
          ref={videoRef}
          className={styles.videoElement}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-label="Hero background video"
        >
          <source src={HERO_MEDIA_SRC} type="video/mp4" />
        </video>
        <audio ref={audioRef} loop muted preload="auto" aria-hidden>
          <source src={HERO_MEDIA_SRC} type="audio/mp4" />
        </audio>
        <div className={styles.overlay} />
        <div className={styles.vignette} />
      </div>

      <div className={styles.content}>
        <div className={styles.badge}>
          <span className={styles.dot} />
          <span>Available for new opportunities</span>
        </div>
        <h1 className={styles.title}>
          TARUN <span className={styles.accent}>YADAV</span>
        </h1>
        <p className={styles.subtitle}>AI Engineer | ML Systems | GenAI</p>
        <p className={styles.description}>
          Building intelligent systems that feel like magic. Transforming complex data architectures into seamless,
          predictive experiences.
        </p>
        <div className={styles.actions}>
          <button type="button" className={styles.primaryBtn} onClick={scrollToWork}>
            View Work
          </button>
          <a href="/projects" className={styles.secondaryBtn}>
            Explore Projects
          </a>
        </div>
      </div>

      <div className={styles.muteLabel}>{isMuted ? "Muted" : "Sound On"}</div>
      <button type="button" onClick={handleToggleMute} className={styles.muteBtn} aria-label={isMuted ? "Unmute media" : "Mute media"}>
        {isMuted ? "Unmute" : "Mute"}
      </button>
    </section>
  );
}
