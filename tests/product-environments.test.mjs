import assert from "node:assert/strict";
import { createRequire } from "node:module";
import test from "node:test";

const require = createRequire(import.meta.url);
const { build } = createRequire(require.resolve("vite/package.json"))("esbuild");
const bundle = await build({
  stdin: { contents: `import React from "react";
    import { renderToStaticMarkup } from "react-dom/server";
    import ProductEnvironment from "./src/components/project-cases/ProductEnvironment.jsx";
    import { LanguageProvider } from "./src/i18n/LanguageContext.jsx";
    import Calmera from "./src/product-slices/generated/calmera.mjs";
    import Opinioteca from "./src/product-slices/generated/opinioteca.mjs";
    import Trato from "./src/product-slices/generated/trato.mjs";
    import Vwrks from "./src/product-slices/generated/vwrks.mjs";
    const screens = {trato: Trato, opinioteca: Opinioteca, "calmera-os": Calmera, vwrks: Vwrks};
    export function render(slug) { return renderToStaticMarkup(<LanguageProvider><ProductEnvironment project={{slug}} /></LanguageProvider>); }
    export function renderScreen(slug) { const Screen = screens[slug]; return renderToStaticMarkup(<Screen/>); }`,
    resolveDir: new URL("..", import.meta.url).pathname, loader: "jsx" },
  bundle: true, write: false, platform: "node", format: "cjs", packages: "external", jsx: "automatic", loader: { ".css": "empty" },
});
const compiled = { exports: {} };
new Function("require", "module", "exports", bundle.outputFiles[0].text)(require, compiled, compiled.exports);

test("project demos explain their actions in both portfolio languages and link to the live products", () => {
  const previous = globalThis.localStorage;
  try {
    for (const language of ["en", "pt"]) {
      globalThis.localStorage = { getItem: () => language };
      for (const slug of ["trato", "opinioteca", "calmera-os", "vwrks"]) {
        const html = compiled.exports.render(slug);
        assert.match(html, /data-product-environment=/);
        assert.match(html, language === "pt" ? /As ações ficam nesta página/ : /Actions stay on this page/);
        assert.match(html, /target="_blank" rel="noopener noreferrer"/);
        assert.doesNotMatch(html, /prototype-toolbar|prototype-hotspot|<iframe\b|undefined/);
      }
    }
  } finally {
    if (previous === undefined) delete globalThis.localStorage;
    else globalThis.localStorage = previous;
  }
});

test("copied screens retain their original product navigation and controls", () => {
  const calmera = compiled.exports.renderScreen("calmera-os");
  assert.match(calmera, /Buscar no catálogo por nome ou descrição/);
  assert.match(calmera, /data-slot="sheet-trigger"/);
  assert.equal((calmera.match(/<article\b/g) ?? []).length, 3);
  assert.match(calmera, /Vela 150ml - Lavanda/);
  const reader = compiled.exports.renderScreen("opinioteca");
  assert.match(reader, /Para você/);
  assert.match(reader, /Seguindo/);
  assert.match(reader, /Nova Avaliação/);
  assert.match(reader, /Mensagens/);
  const trato = compiled.exports.renderScreen("trato");
  assert.match(trato, /1. Escolha os serviços/);
  assert.match(trato, /data-slot="card"/);
  assert.match(trato, /Adicionar um Corte/);
  assert.match(compiled.exports.renderScreen("vwrks"), /Trabalhos Selecionados/);
});
