import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import "../stitch_new_project (1)/styles/stitch.css";
import { allCertificates, featuredProjects, openSourceProjects } from "@/stitch_new_project (1)/utils/siteContent";

export const metadata: Metadata = {
  title: "TARUN YADAV | AI Engineer",
  description: "AI Engineer | ML Systems | GenAI — Building intelligent systems that feel like magic",
  keywords: ["AI Engineer", "Machine Learning", "GenAI", "Portfolio", "Tarun Yadav"],
};

import CustomCursor from "@/stitch_new_project (1)/components/CustomCursor";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="film-grain">
        <CustomCursor />
        <Script
          id="project-route-map"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.__projectRouteMap = ${JSON.stringify({
                ...Object.fromEntries(featuredProjects.map((item) => [item.id, "/project/" + item.id])),
                ...Object.fromEntries(openSourceProjects.map((item) => [item.id, "/github/" + item.id])),
                ...Object.fromEntries(allCertificates.map((item) => [item.id, "/certificate/" + item.id])),
              })};
              window.goToProject = function(id) {
                console.log("Clicked:", id);
                var route = window.__projectRouteMap[id] || ('/project/' + id);
                window.location.href = route;
              };
              `
            }}
          />
        {children}
      </body>
    </html>
  );
}
