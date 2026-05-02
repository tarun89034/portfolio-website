"use client";

import React from "react";
import { techIcons } from "../utils/techIcons";

interface TechStackProps {
  tech: string[];
  className?: string;
}

export default function TechStack({ tech, className = "" }: TechStackProps) {
  if (!tech || tech.length === 0) return null;

  return (
    <div className={`flex flex-wrap gap-x-2.5 gap-y-2.5 sm:gap-x-3 sm:gap-y-3 mt-5 ${className}`}>
      {tech.map((item, index) => {
        const iconData = techIcons[item];
        const Icon = iconData?.icon;
        const iconColor = iconData?.color || "#A5B4FC";

        return (
          <span 
            key={index} 
            className="flex items-center gap-2 px-4 py-2 text-[13px] font-medium rounded-full text-[#E5E7EB] bg-indigo-500/10 border border-indigo-500/20 backdrop-blur-md transition-all duration-300 hover:bg-indigo-500/20 hover:border-indigo-500/40 hover:shadow-[0_0_15px_rgba(99,102,241,0.15)] whitespace-nowrap"
          >
            {Icon && (
              <Icon 
                size={16} 
                style={{ color: iconColor }}
                className="opacity-90 flex-shrink-0" 
              />
            )}
            <span className="leading-none mt-[1px]">{item}</span>
          </span>
        );
      })}
    </div>
  );
}
