"use client";

import { useMemo, useState, useRef } from "react";
import { useRouter } from "next/navigation";
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
  const { shouldShowVideo, onMouseEnter, onMouseLeave } = useHoverVideo(400);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [shine, setShine] = useState({ x: 50, y: 50 });

  const transformStyle = useMemo(
    () => ({
      transform: `perspective(900px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translateY(-4px)`,
      ["--shine-x" as string]: `${shine.x}%`,
      ["--shine-y" as string]: `${shine.y}%`,
    }),
    [shine.x, shine.y, tilt.x, tilt.y]
  );

  const handleMove = (event: React.MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    setTilt({ x: (x - 0.5) * 8, y: (0.5 - y) * 6 });
    setShine({ x: x * 100, y: y * 100 });
  };

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
  const liveLink = isCertificate(item) ? item.link : isProject(item) ? item.live : "";
  const githubLink = isProject(item) ? item.github : null;
  const videoSrc = (item as any).video; // Safely access video if it exists

  return (
    <article
      className="group relative aspect-[2/3] w-[260px] flex-shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-[#171b27] transition-all duration-500 ease-out hover:border-indigo-300/40 hover:shadow-[0_20px_80px_rgba(108,140,255,0.25)] cursor-pointer"
      onMouseMove={handleMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={() => {
        setTilt({ x: 0, y: 0 });
        onMouseLeave();
      }}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${item.title}`}
      style={tilt.x || tilt.y ? transformStyle : undefined}
    >
      {/* Media Content */}
      <div className="absolute inset-0 z-0">
        {!shouldShowVideo || !videoSrc ? (
          <img
            src={item.image}
            alt={item.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 pointer-events-none"
          />
        ) : (
          <video
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
          />
        )}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f1a] via-[#0b0f1a]/30 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(108,140,255,0.35),transparent_45%),radial-gradient(circle_at_80%_80%,rgba(168,85,247,0.28),transparent_55%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 [background:radial-gradient(circle_at_var(--shine-x,50%)_var(--shine-y,50%),rgba(255,255,255,0.28),transparent_33%)] mix-blend-screen pointer-events-none" />

      {/* Info Overlay */}
      <div className="absolute inset-x-0 bottom-0 p-5 pointer-events-none z-10">
        <p className="text-[10px] uppercase tracking-[0.16em] text-indigo-200/90">{category}</p>
        <h3 className="mt-1 text-xl font-bold text-slate-100">{item.title}</h3>
        
        {/* Only show description on hover if not playing video, or show it slightly faded */}
        <p className={`mt-2 line-clamp-3 text-sm text-slate-300/95 transition-all duration-500 ${shouldShowVideo ? 'opacity-40' : 'opacity-0 group-hover:opacity-100 group-hover:translate-y-0'}`}>
          {item.description}
        </p>

        <div className="mt-3 flex flex-wrap gap-2 opacity-0 transition-all duration-500 group-hover:opacity-100">
          {liveLink && (
            <span className="rounded-full border border-indigo-200/35 px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-indigo-100">
              {type === "certificate" ? "View" : "Live"}
            </span>
          )}
          {githubLink && (
            <span className="rounded-full border border-white/25 px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-slate-100">
              GitHub
            </span>
          )}
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/0 transition-all duration-500 group-hover:ring-indigo-200/35 z-20"
        style={{ animationDelay: `${index * 85}ms` }}
      />
    </article>
  );
}