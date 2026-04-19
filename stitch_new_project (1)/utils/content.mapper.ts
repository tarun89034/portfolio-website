import type { PortfolioProject, UiProject, PortfolioCertificate, UiCertificate } from "./content.types";

export const toSlug = (value: string): string =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export const categoryFromProject = (project: Pick<PortfolioProject, "live" | "tech">): string => {
  if (project.live.includes("huggingface")) return "HuggingFace Space";
  if (project.live.includes("vercel")) return "Web App";
  if (project.tech?.[0]) return project.tech[0];
  return "AI Project";
};

export const mapProjectToUi = (project: PortfolioProject): UiProject => ({
  id: project.id,
  type: project.type,
  title: project.title,
  category: categoryFromProject(project),
  description: project.description,
  image: project.image,
  video: project.video,
  images: project.images,
  github: project.github,
  live: project.live,
  tech: project.tech,
});

export const mapCertificateToUi = (certificate: PortfolioCertificate): UiCertificate => ({
  id: certificate.id,
  title: certificate.title,
  issuer: certificate.issuer,
  image: certificate.image,
  description: certificate.description,
  link: certificate.link,
  date: certificate.date,
});

