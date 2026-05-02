import Link from "next/link";
import { featuredProjects } from "../utils/siteContent";
import MediaCard from "./MediaCard";

type ProjectShowcaseProps = {
  showAll?: boolean;
};

export default function ProjectShowcase({ showAll = false }: ProjectShowcaseProps) {
  return (
    <section id="work" className="relative mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12 xl:px-20 py-16 lg:py-24">
      <div className="pointer-events-none absolute -left-20 top-8 h-40 w-40 rounded-full bg-indigo-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-52 w-52 rounded-full bg-violet-400/20 blur-3xl" />

      <div className="mb-10 sm:mb-14 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-indigo-200/90">Premium Selection</p>
          <h2 className="mt-2 bg-gradient-to-r from-slate-100 to-indigo-100 bg-clip-text text-3xl font-bold tracking-tight text-transparent md:text-4xl">
            Featured Projects
          </h2>
        </div>
        {!showAll && (
          <Link
            href="/projects"
            className="rounded-full border border-indigo-200/30 px-4 py-2 text-sm text-indigo-200 transition-all hover:border-indigo-200/60 hover:bg-indigo-200/10 hover:text-indigo-100"
          >
            View all projects
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 gap-8 md:gap-10 lg:gap-12 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
        {featuredProjects.slice(0, showAll ? featuredProjects.length : 3).map((project, index) => (
          <MediaCard key={project.id} item={project} type="project" index={index} />
        ))}
      </div>

      <div className="mt-10 h-px w-full bg-gradient-to-r from-transparent via-indigo-200/20 to-transparent" />
    </section>
  );
}
