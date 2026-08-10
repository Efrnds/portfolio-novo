import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getProject } from "../data/projects";

const HOME_TITLE = "Eduardo Fernandes | Full Stack Engineer";
const HOME_DESC =
  "Eduardo Fernandes, full stack engineer. B2B SaaS, internal tools, Next.js, Node.js, Go, TypeScript. Brazil-based, open to remote.";

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

  useEffect(() => {
    const projectMatch = pathname.match(/^\/projects\/([^/]+)/);
    const project = projectMatch ? getProject(projectMatch[1]) : null;

    const title = project
      ? `${project.title} | Eduardo Fernandes`
      : HOME_TITLE;
    const description = project
      ? project.tagline || project.summary || HOME_DESC
      : HOME_DESC;

    document.title = title;
    setMeta("description", description);
    setMeta("og:title", title, "property");
    setMeta("og:description", description, "property");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
  }, [pathname]);

  return null;
}
