"use client";

import { useMemo, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useHoverVideo } from "../hooks/useHoverVideo";
import type { MediaType, MediaItem } from "../utils/content.types";

const isCertificate = (item: MediaItem): item is Extract<MediaItem, { issuer: string }> => {
  return "issuer" in item;
};

const isProject = (item: MediaItem): item is Extract<MediaItem, { category: string }> => {
  return "category" in item;
};

type MediaCardProps = {
  item: MediaItem;
  type: MediaType;
  index: number;
  onOpenLightbox?: (image: string) => void;
};

export default function MediaCard({ item, type, index, onOpenLightbox }: MediaCardProps) {
  const router = useRouter();
  const { shouldShowVideo, onMouseEnter, onMouseLeave } = useHoverVideo(300);
  const [isFocused, setIsFocused] = useState(false);

  const handleClick = () => {
    if (type === "certificate" && onOpenLightbox) {
      onOpenLightbox(item.image);
      return;
    }

    let route = "";
    if (type === "certificate") {
      route = `/certificate/${item.id}`;
    } else if (type === "github") {
      route = `/github/${item.id}`;
    } else {
      route = `/project/${item.id}`;
    }

    try {
      router.push(route);
    } catch (error) {
      window.location.href = route;
    }
  };

  const category = isCertificate(item) ? item.issuer : isProject(item) ? item.category : "";
  const videoSrc = (item as any).video;

  return (
    <div className="w-[240px] flex-shrink-0 group">
      <motion.article
        className="relative aspect-[2/3] w-full cursor-pointer overflow-hidden rounded-xl border border-white/10 bg-[#171b27] transition-all duration-300 hover:border-indigo-400/50 hover:shadow-[0_0_40px_rgba(108,140,255,0.3)]"
        onMouseEnter={() => {
          onMouseEnter();
          setIsFocused(true);
        }}
        onMouseLeave={() => {
          onMouseLeave();
          setIsFocused(false);
        }}
        onClick={handleClick}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {/* Media Content */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            {!shouldShowVideo || !videoSrc ? (
              <motion.img
                key="image"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover object-center"
              />
            ) : (
              <motion.video
                key="video"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                src={videoSrc}
                autoPlay
                muted
                loop
                playsInline
                className="h-full w-full object-cover object-center"
              />
            )}
          </AnimatePresence>
        </div>

        {/* Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-100" />
        <div className="card-vignette" />
        
        {/* Subtle tag overlay */}
        <div className="absolute top-3 left-3 z-10">
          <span className="rounded-sm bg-black/40 px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-slate-300 backdrop-blur-md border border-white/5">
            {category || type}
          </span>
        </div>
      </motion.article>

      {/* Title BELOW card - Requirement #2 & Task 4 */}
      <div className="mt-4 px-1 text-center transition-all duration-300 group-hover:translate-y-1">
        <h3 className="text-sm font-semibold tracking-tight text-slate-200 group-hover:text-white">
          {item.title}
        </h3>
        {isFocused && (
          <motion.p 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-1 text-[10px] text-indigo-300/80 uppercase tracking-widest font-bold"
          >
            View Details
          </motion.p>
        )}
      </div>
    </div>
  );
}