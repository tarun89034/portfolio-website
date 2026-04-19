import { portfolioLinks } from "../utils/siteContent";

export default function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-[#0f131e] px-5 py-12 md:px-8">
      <div className="pointer-events-none absolute -left-24 top-0 h-56 w-56 rounded-full bg-indigo-400/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-56 w-56 rounded-full bg-violet-400/15 blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-200/30 to-transparent" />
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 text-slate-400 md:flex-row md:items-center md:justify-between">
        <p className="text-sm tracking-[0.08em] text-slate-300">TARUN YADAV</p>
        <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.14em] text-slate-400">
          <a href={portfolioLinks.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-200">
            LinkedIn
          </a>
          <a href={portfolioLinks.github} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-200">
            GitHub
          </a>
          <a href={`mailto:${portfolioLinks.email}`} className="hover:text-indigo-200">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
