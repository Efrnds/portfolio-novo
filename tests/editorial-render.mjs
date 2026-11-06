import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { build } = createRequire(require.resolve("vite/package.json"))("esbuild");
const bundle = await build({
  stdin: {
    contents: `import React from "react";
      import { renderToStaticMarkup } from "react-dom/server";
      import { MemoryRouter, Route, Routes } from "react-router-dom";
      import { LanguageProvider } from "./src/i18n/LanguageContext.jsx";
      import Main from "./src/Layout/Main.jsx";
      import Header from "./src/Layout/Header.jsx";
      import Footer from "./src/Layout/Footer.jsx";
      import ProjectCard from "./src/components/ProjectCard.jsx";
      import ProjectPage from "./src/pages/ProjectPage.jsx";
      import { projects } from "./src/data/projects.js";
      export function render(target = "home") {
        const project = projects.find(item => item.slug === target);
        const content = project ? <main className="home-main"><ProjectCard project={project} index={projects.indexOf(project)} /></main>
          : target.startsWith("/projects/") ? <Routes><Route path="/projects/:slug" element={<ProjectPage />} /></Routes> : <Main />;
        return renderToStaticMarkup(<MemoryRouter initialEntries={[target.startsWith("/projects/") ? target : "/"]}><LanguageProvider><Header />{content}<Footer /></LanguageProvider></MemoryRouter>);
      }`,
    resolveDir: new URL("..", import.meta.url).pathname,
    loader: "jsx",
  },
  bundle: true,
  write: false,
  platform: "node",
  format: "cjs",
  packages: "external",
  jsx: "automatic",
  loader: { ".css": "empty" },
  define: { "import.meta.glob": "__testVideos" },
  banner: { js: "const __testVideos = () => ({});" },
});
const compiled = { exports: {} };
new Function("require", "module", "exports", bundle.outputFiles[0].text)(require, compiled, compiled.exports);

export function renderEditorial(language = "en", target = "home") {
  const previous = globalThis.localStorage;
  globalThis.localStorage = { getItem: () => language };
  try {
    return compiled.exports.render(target);
  } finally {
    if (previous === undefined) delete globalThis.localStorage;
    else globalThis.localStorage = previous;
  }
}
