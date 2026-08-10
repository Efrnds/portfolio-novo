import { useEffect } from "react";
import { projects } from "../data/projects";

/**
 * Injects Person + CreativeWork JSON-LD from existing project data.
 * No manual SEO sheets required.
 */
export default function JsonLd() {
  useEffect(() => {
    const data = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Person",
          name: "Eduardo Fernandes",
          jobTitle: "Full Stack Software Engineer",
          url: "https://efrnds.vercel.app",
          email: "mailto:contato.efrnds@outlook.com",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Umuarama",
            addressRegion: "PR",
            addressCountry: "BR",
          },
          sameAs: [
            "https://github.com/Efrnds",
            "https://linkedin.com/in/edudfrs",
          ],
          knowsAbout: [
            ...new Set(projects.flatMap((p) => p.stack)),
          ].slice(0, 20),
        },
        {
          "@type": "ItemList",
          name: "Selected work",
          itemListElement: projects.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: p.title,
            description: p.tagline,
            url: `https://efrnds.vercel.app/projects/${p.slug}`,
          })),
        },
      ],
    };

    const id = "site-jsonld";
    let script = document.getElementById(id);
    if (!script) {
      script = document.createElement("script");
      script.id = id;
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(data);
  }, []);

  return null;
}
