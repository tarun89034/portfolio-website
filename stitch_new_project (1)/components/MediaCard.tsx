"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
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
};

export default function MediaCard({ item, type, index }: MediaCardProps) {
  const router = useRouter();
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
    console.log("Card clicked:", item.id, item.title, type);
    let route = "";
    if (type === "certificate") {
      route = `/certificate/${item.id}`;
    } else if (type === "github") {
      route = `/github/${item.id}`;
    } else {
      route = `/project/${item.id}`;
    }
    console.log("Navigating to:", route);
    try {
      router.push(route);
      console.log("router.push called successfully");
    } catch (error) {
      console.error("router.push failed, using window.location.href:", error);
      window.location.href = route;
    }
  };

  const category = isCertificate(item) ? item.issuer : isProject(item) ? item.category : "";
  const liveLink = isCertificate(item) ? item.link : isProject(item) ? item.live : "";
  const githubLink = isProject(item) ? item.github : null;

  return (
    <article
      className="group relative aspect-[2/3] overflow-hidden rounded-2xl border border-white/10 bg-[#171b27] transition-all duration-500 ease-out hover:border-indigo-300/40 hover:shadow-[0_20px_80px_rgba(108,140,255,0.25)] cursor-pointer"
      onMouseMove={handleMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
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
      <img
        src={item.image}
        alt={item.title}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 pointer-events-none"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f1a] via-[#0b0f1a]/30 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(108,140,255,0.35),transparent_45%),radial-gradient(circle_at_80%_80%,rgba(168,85,247,0.28),transparent_55%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 [background:radial-gradient(circle_at_var(--shine-x,50%)_var(--shine-y,50%),rgba(255,255,255,0.28),transparent_33%)] mix-blend-screen pointer-events-none" />

      <div className="absolute inset-x-0 bottom-0 p-5 pointer-events-none">
        <p className="text-[10px] uppercase tracking-[0.16em] text-indigo-200/90">{category}</p>
        <h3 className="mt-1 text-xl font-bold text-slate-100">{item.title}</h3>
        <p className="mt-2 line-clamp-3 text-sm text-slate-300/95 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
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
        className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/0 transition-all duration-500 group-hover:ring-indigo-200/35"
        style={{ animationDelay: `${index * 85}ms` }}
      />
    </article>
  );
}