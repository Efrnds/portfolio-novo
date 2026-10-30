import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getProject } from "../data/projects";
import { useLanguage } from "../i18n/LanguageContext";

function setMeta(name, content, attr = "name") {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export default function DocumentMeta() {
  const { pathname } = useLocation();
  const { language, localizeProject, copy } = useLanguage();

  useEffect(() => {
    const projectMatch = pathname.match(/^\/projects\/([^/]+)/);
    const rawProject = projectMatch ? getProject(projectMatch[1]) : null;
    const project = rawProject ? localizeProject(rawProject) : null;

    const title = project
      ? `${project.title} | Eduardo Fernandes`
      : copy.meta.homeTitle;
    const description = project
      ? project.tagline || project.summary || copy.meta.homeDescription
      : copy.meta.homeDescription;

    document.title = title;
    setMeta("description", description);
    setMeta("og:title", title, "property");
    setMeta("og:description", description, "property");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    setMeta("og:locale", language === "pt" ? "pt_BR" : "en_US", "property");
  }, [copy, language, localizeProject, pathname]);

  return null;
}
