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
    export function render(slug) { return renderToStaticMarkup(<LanguageProvider><ProductEnvironment project={{slug}} /></LanguageProvider>); }`,
    resolveDir: new URL("..", import.meta.url).pathname, loader: "jsx" },
  bundle: true, write: false, platform: "node", format: "cjs", packages: "external", jsx: "automatic", loader: { ".css": "empty" },
});
const compiled = { exports: {} };
new Function("require", "module", "exports", bundle.outputFiles[0].text)(require, compiled, compiled.exports);

test("project environments render native product controls in both languages", () => {
  const previous = globalThis.localStorage;
  try {
    for (const language of ["en", "pt"]) {
      globalThis.localStorage = { getItem: () => language };
      const trato = compiled.exports.render("trato");
      assert.match(trato, /<form\b/);
      assert.match(trato, /type="radio"/);
      assert.match(trato, /autoComplete="off"/i);
      const reader = compiled.exports.render("opinioteca");
      assert.match(reader, /<textarea\b/);
      assert.match(reader, /A cabeça do santo/);
      assert.match(reader, /aria-pressed="false"/);
      const calmera = compiled.exports.render("calmera-os");
      assert.match(calmera, /<dialog\b/);
      assert.match(calmera, /CALMERA/);
      assert.match(calmera, /<image\b/);
      for (const html of [trato, reader, calmera, compiled.exports.render("vwrks")]) {
        assert.match(html, /data-product-environment=/);
        assert.doesNotMatch(html, /prototype-toolbar|prototype-hotspot|<iframe\b|undefined/);
      }
    }
  } finally {
    if (previous === undefined) delete globalThis.localStorage;
    else globalThis.localStorage = previous;
  }
});
