import content from "../data/content.json";
import { mapProjectToUi, mapCertificateToUi } from "./content.mapper";
import type { NavItem, PortfolioContent, UiProject, UiCertificate } from "./content.types";

export type { NavItem, UiProject as ProjectItem, UiCertificate as CertificateItem } from "./content.types";

const typedContent = content as PortfolioContent;

export const navItems: NavItem[] = [
  { label: "Work", href: "/#work" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export const allProjects: UiProject[] = typedContent.projects.map(mapProjectToUi);

export const featuredProjects: UiProject[] = allProjects.filter((p) => p.type === "featured");

export const openSourceProjects: UiProject[] = allProjects.filter((p) => p.type === "github");

export const allCertificates: UiCertificate[] = typedContent.certificates.map(mapCertificateToUi);

export const portfolioLinks = typedContent.links;
export const portfolioSkills = typedContent.skills;
