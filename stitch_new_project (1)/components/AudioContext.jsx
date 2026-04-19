"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

const AudioContext = createContext(null);
const SYNC_THRESHOLD_SECONDS = 0.35;

export function AudioProvider({ children }) {
  const mediaRef = useRef({ video: null, audio: null });
  const cleanupRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const mutedRef = useRef(true);
  const interactedRef = useRef(false);

  useEffect(() => {
    mutedRef.current = isMuted;
  }, [isMuted]);

  useEffect(() => {
    interactedRef.current = hasInteracted;
  }, [hasInteracted]);

  const clearListeners = useCallback(() => {
    if (cleanupRef.current) {
      cleanupRef.current();
      cleanupRef.current = null;
    }
  }, []);

  const applyMuteState = useCallback((nextMuted) => {
    const { video, audio } = mediaRef.current;
    if (!video || !audio) return;

    video.muted = nextMuted;
    audio.muted = nextMuted;

    if (nextMuted) {
      audio.pause();
      return;
    }

    audio.currentTime = video.currentTime;
    void video.play().catch(() => undefined);

    if (interactedRef.current) {
      void audio.play().catch(() => undefined);
    }
  }, []);

  const setupMediaListeners = useCallback(() => {
    const { video, audio } = mediaRef.current;
    clearListeners();
    if (!video || !audio) return;

    const syncAudio = () => {
      if (Math.abs(audio.currentTime - video.currentTime) > SYNC_THRESHOLD_SECONDS) {
        audio.currentTime = video.currentTime;
      }
    };

    const onVideoPlay = () => {
      if (mutedRef.current || !interactedRef.current) return;
      audio.currentTime = video.currentTime;
      void audio.play().catch(() => undefined);
    };

    const onVideoPause = () => {
      audio.pause();
    };

    video.addEventListener("timeupdate", syncAudio);
    video.addEventListener("seeking", syncAudio);
    video.addEventListener("play", onVideoPlay);
    video.addEventListener("pause", onVideoPause);

    cleanupRef.current = () => {
      video.removeEventListener("timeupdate", syncAudio);
      video.removeEventListener("seeking", syncAudio);
      video.removeEventListener("play", onVideoPlay);
      video.removeEventListener("pause", onVideoPause);
    };
  }, [clearListeners]);

  const registerMedia = useCallback(
    (video, audio) => {
      if (!video || !audio) return () => {};

      mediaRef.current.video = video;
      mediaRef.current.audio = audio;
      applyMuteState(mutedRef.current);
      setupMediaListeners();

      return () => {
        const isCurrentMedia = mediaRef.current.video === video && mediaRef.current.audio === audio;
        if (!isCurrentMedia) return;

        clearListeners();
        mediaRef.current.video = null;
        mediaRef.current.audio = null;
      };
    },
    [applyMuteState, clearListeners, setupMediaListeners]
  );

  const setMuted = useCallback(
    (nextMuted, userTriggered = false) => {
      if (userTriggered) {
        interactedRef.current = true;
        setHasInteracted(true);
      }

      mutedRef.current = nextMuted;
      setIsMuted(nextMuted);

      applyMuteState(nextMuted);
    },
    [applyMuteState]
  );

  const toggleMute = useCallback(() => {
    setMuted(!isMuted, true);
  }, [isMuted, setMuted]);

  const value = useMemo(
    () => ({ isMuted, hasInteracted, registerMedia, setMuted, toggleMute }),
    [hasInteracted, isMuted, registerMedia, setMuted, toggleMute]
  );

  return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>;
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used inside AudioProvider");
  }

  return context;
}
