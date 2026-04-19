"use client";
import { motion } from "framer-motion";

interface Skills {
  languages: string[];
  aiMl: string[];
  backend: string[];
  cloud: string[];
  frontend: string[];
}

interface SkillsSectionProps {
  skills: Skills;
}

const skillGroups = [
  { key: "languages" as keyof Skills, label: "Languages", color: "#6C8CFF" },
  { key: "aiMl" as keyof Skills, label: "AI / ML", color: "#A855F7" },
  { key: "backend" as keyof Skills, label: "Backend & Data", color: "#10B981" },
  { key: "cloud" as keyof Skills, label: "Cloud & MLOps", color: "#F59E0B" },
  { key: "frontend" as keyof Skills, label: "Frontend", color: "#EC4899" },
];

export default function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <section id="skills" className="py-24 px-6 md:px-16 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="mb-16"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="w-1 h-8 rounded-full bg-gradient-to-b from-[#6C8CFF] to-[#A855F7]" />
          <h2 className="font-display text-3xl md:text-5xl text-white tracking-wide">Skills & Arsenal</h2>
        </div>
        <p className="font-body text-white/40 ml-5 mt-2 max-w-xl">
          Technologies I use to build production-grade AI systems
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skillGroups.map((group, gi) => (
          <motion.div
            key={group.key}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: gi * 0.1 }}
            className="glass-card rounded-2xl p-6 hover:border-[rgba(108,140,255,0.3)] transition-all duration-300 group"
            style={{ borderColor: `${group.color}20` }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-2 h-2 rounded-full" style={{ background: group.color, boxShadow: `0 0 8px ${group.color}80` }} />
              <h3 className="font-mono text-xs tracking-[0.25em] uppercase" style={{ color: group.color }}>
                {group.label}
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {(skills[group.key] as string[]).map((skill, si) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: gi * 0.1 + si * 0.05 }}
                  whileHover={{ scale: 1.08 }}
                  className="px-3 py-1.5 rounded-full font-body text-xs text-white/70 cursor-default transition-all duration-200"
                  style={{
                    background: `${group.color}10`,
                    border: `1px solid ${group.color}20`,
                  }}
                  onMouseEnter={(e) => {
                    (e.target as HTMLElement).style.background = `${group.color}25`;
                    (e.target as HTMLElement).style.borderColor = `${group.color}60`;
                    (e.target as HTMLElement).style.color = "#fff";
                  }}
                  onMouseLeave={(e) => {
                    (e.target as HTMLElement).style.background = `${group.color}10`;
                    (e.target as HTMLElement).style.borderColor = `${group.color}20`;
                    (e.target as HTMLElement).style.color = "rgba(255,255,255,0.7)";
                  }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
