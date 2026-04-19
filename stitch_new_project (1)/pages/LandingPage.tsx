import HeroSection from "../components/HeroSection";
import { AudioProvider } from "../components/AudioContext";
import ProjectRow from "../components/ProjectRow";
import SiteFooter from "../components/SiteFooter";
import SiteNavbar from "../components/SiteNavbar";
import { featuredProjects, openSourceProjects, allCertificates } from "../utils/siteContent";

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

        <section id="about" className="relative mx-auto w-full max-w-7xl px-5 py-20 md:px-8">
          <p className="text-xs uppercase tracking-[0.2em] text-indigo-200">About</p>
          <h2 className="mt-3 bg-gradient-to-r from-slate-100 to-indigo-100 bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-4xl">
            Building cinematic AI products
          </h2>
          <p className="mt-4 max-w-3xl text-slate-300 leading-relaxed">
            I design and ship machine learning systems with production-grade architecture, focusing on intelligent
            interfaces, reliable infrastructure, and measurable impact.
          </p>
        </section>
        <section id="contact" className="mx-auto w-full max-w-7xl px-5 pb-24 md:px-8">
          <div className="rounded-3xl border border-white/15 bg-[linear-gradient(135deg,rgba(23,27,39,0.92),rgba(28,34,48,0.76))] p-8 shadow-[0_16px_70px_rgba(8,10,20,0.45)] backdrop-blur md:p-12">
            <p className="text-xs uppercase tracking-[0.2em] text-indigo-200">Contact</p>
            <h3 className="mt-3 text-2xl font-bold md:text-3xl">Let&apos;s build the future together</h3>
            <a
              href="mailto:hello@tarunyadav.ai"
              className="mt-6 inline-block rounded-full bg-gradient-to-r from-[#b6c4ff] to-[#6c8cff] px-6 py-3 font-semibold text-[#001550] shadow-[0_10px_30px_rgba(108,140,255,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(108,140,255,0.5)]"
            >
              Get in touch
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </AudioProvider>
  );
}
