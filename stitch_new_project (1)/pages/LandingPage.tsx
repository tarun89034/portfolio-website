"use client";

import { useState } from "react";
import HeroSection from "../components/HeroSection";
import { AudioProvider } from "../components/AudioContext";
import ProjectRow from "../components/ProjectRow";
import SiteFooter from "../components/SiteFooter";
import SiteNavbar from "../components/SiteNavbar";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import SkillsSection from "../components/SkillsSection";
import Lightbox from "../components/Lightbox";
import { featuredProjects, openSourceProjects, allCertificates, portfolioLinks } from "../utils/siteContent";

export default function LandingPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <AudioProvider>
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute left-1/4 top-[28rem] h-80 w-80 rounded-full bg-indigo-400/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 top-[52rem] h-96 w-96 rounded-full bg-violet-400/10 blur-3xl" />
        
        <HeroSection />
        
        <div id="work" className="py-12">
          <ProjectRow 
            title="Featured Projects" 
            items={featuredProjects} 
          />
          <ProjectRow 
            title="Projects on GitHub" 
            items={openSourceProjects} 
            type="github" 
          />
          <ProjectRow 
            title="Certificates" 
            items={allCertificates} 
            type="certificate" 
            onOpenLightbox={(image) => setSelectedImage(image)}
          />
        </div>

        <AboutSection />
        <SkillsSection />
        <ContactSection personal={portfolioLinks} />

        <Lightbox 
          image={selectedImage} 
          onClose={() => setSelectedImage(null)} 
        />
      </div>
      <SiteFooter />
    </AudioProvider>
  );
}
