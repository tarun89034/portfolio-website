import Link from "next/link";
import ResumeDownloadButton from "./ResumeDownloadButton";
import { navItems } from "../utils/siteContent";

export default function SiteNavbar() {
  return (
    <header className="fixed top-0 left-0 w-full h-16 z-50 bg-red-500 border-b border-white/10 backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(108,140,255,0.16),transparent_60%)] opacity-80" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-indigo-300/35 to-transparent" />
      <nav className="mx-auto flex h-full w-full max-w-7xl items-center justify-between px-5 md:px-8">
        <Link href="/" className="relative text-lg font-black tracking-tight text-indigo-100 transition-all duration-300 hover:text-white">
          TARUN YADAV
          <span className="pointer-events-none absolute -bottom-1 left-0 h-px w-full bg-gradient-to-r from-indigo-200/80 via-violet-300/70 to-transparent" />
        </Link>
        <div className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="nav-link group relative text-sm tracking-[0.08em]"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-indigo-200 to-violet-300 transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-4">
          {/* Action buttons could go here in future */}
        </div>
      </nav>
    </header>
  );
}
