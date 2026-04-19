import Link from "next/link";
import ResumeDownloadButton from "./ResumeDownloadButton";
import { navItems } from "../utils/siteContent";

export default function SiteNavbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#0f131e]/50 backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(108,140,255,0.16),transparent_60%)] opacity-80" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-indigo-300/35 to-transparent" />
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 md:px-8">
        <Link href="/" className="relative text-lg font-black tracking-tight text-indigo-100 transition-all duration-300 hover:text-white">
          TARUN YADAV
          <span className="pointer-events-none absolute -bottom-1 left-0 h-px w-full bg-gradient-to-r from-indigo-200/80 via-violet-300/70 to-transparent" />
        </Link>
        <div className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="group relative text-sm tracking-[0.08em] text-slate-300 transition-colors duration-300 hover:text-indigo-100"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-indigo-200 to-violet-300 transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>
        <ResumeDownloadButton
          className="rounded-full bg-gradient-to-r from-[#6c8cff] to-[#a855f7] px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.08em] text-white shadow-[0_0_24px_rgba(108,140,255,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_34px_rgba(108,140,255,0.55)] md:px-4 md:text-xs"
        />
      </nav>
    </header>
  );
}
