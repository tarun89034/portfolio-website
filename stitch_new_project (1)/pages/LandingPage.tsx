import HeroSection from "../components/HeroSection";
import { AudioProvider } from "../components/AudioContext";
import ProjectRow from "../components/ProjectRow";
import SiteFooter from "../components/SiteFooter";
import SiteNavbar from "../components/SiteNavbar";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import { featuredProjects, openSourceProjects, allCertificates, portfolioLinks } from "../utils/siteContent";

export default function LandingPage() {
  return (
    <AudioProvider>
      <SiteNavbar />
      <main className="relative overflow-hidden bg-[#0f131e] text-[#dfe2f2]">
        <div className="pointer-events-none absolute left-1/4 top-[28rem] h-80 w-80 rounded-full bg-indigo-400/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 top-[52rem] h-96 w-96 rounded-full bg-violet-400/10 blur-3xl" />
        <HeroSection />
        
        <div id="work" className="py-12">
          <ProjectRow title="Featured Projects" items={featuredProjects} />
          <ProjectRow title="Projects on GitHub" items={openSourceProjects} type="github" />
          <ProjectRow title="Certificates" items={allCertificates} type="certificate" />
        </div>

        <AboutSection />
        <ContactSection personal={portfolioLinks} />
      </main>
      <SiteFooter />
    </AudioProvider>
  );
}
