export type NavItem = {
  label: string;
  href: string;
};

export type PortfolioProject = {
  id: string;
  type: "featured" | "github";
  title: string;
  description: string;
  image: string;
  video: string;
  images: string[];
  github: string;
  live: string;
  tech: string[];
};

export type PortfolioCertificate = {
  id: string;
  title: string;
  issuer: string;
  image: string;
  description: string;
  link: string;
  date: string;
};

export type PortfolioContent = {
  projects: PortfolioProject[];
  skills: string[];
  certificates: PortfolioCertificate[];
  links: {
    linkedin: string;
    github: string;
    email: string;
  };
};

export type UiProject = {
  id: string;
  type: "featured" | "github";
  title: string;
  category: string;
  description: string;
  image: string;
  video: string;
  images: string[];
  github: string;
  live: string;
  tech: string[];
};

export type UiCertificate = {
  id: string;
  title: string;
  issuer: string;
  image: string;
  description: string;
  link: string;
  date: string;
};

export type MediaType = "project" | "github" | "certificate";

export type MediaItem = UiProject | UiCertificate;

