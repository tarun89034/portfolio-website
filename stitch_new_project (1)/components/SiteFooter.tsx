import { portfolioLinks } from "../utils/siteContent";
import { Link, Code, Mail } from "lucide-react";

export default function SiteFooter() {
  return (
    <footer className="footer relative overflow-hidden">
      {/* Decorative glows */}
      <div className="pointer-events-none absolute -left-24 top-0 h-48 w-48 rounded-full bg-indigo-500/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-48 w-48 rounded-full bg-purple-500/5 blur-3xl" />
      
      <div className="footer-container">
        <div className="footer-left">
          <h3 className="footer-name">TARUN YADAV</h3>
          <p className="footer-tagline">AI Engineer | ML Systems | GenAI</p>
        </div>

        <div className="footer-right">
          <a 
            href={portfolioLinks.linkedin} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="footer-link"
          >
            <Link size={16} /> LinkedIn
          </a>
          <a 
            href={portfolioLinks.github} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="footer-link"
          >
            <Code size={16} /> GitHub
          </a>
          <a 
            href={`mailto:${portfolioLinks.email}`} 
            className="footer-link"
          >
            <Mail size={16} /> Email
          </a>
        </div>
      </div>
    </footer>
  );
}
