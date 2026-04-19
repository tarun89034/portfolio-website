import ProjectShowcase from "../components/ProjectShowcase";
import SiteFooter from "../components/SiteFooter";
import SiteNavbar from "../components/SiteNavbar";

export default function ProjectsPage() {
  return (
    <>
      <SiteNavbar />
      <main className="min-h-screen bg-[#0f131e] pt-24 text-[#dfe2f2]">
        <section className="mx-auto w-full max-w-7xl px-5 md:px-8">
          <p className="text-xs uppercase tracking-[0.2em] text-indigo-200">Project Archive</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">All Projects</h1>
          <p className="mt-4 max-w-2xl text-slate-300">
            A focused collection of AI, MLOps, and backend systems work designed for scale and reliability.
          </p>
        </section>
        <ProjectShowcase showAll />
      </main>
      <SiteFooter />
    </>
  );
}
