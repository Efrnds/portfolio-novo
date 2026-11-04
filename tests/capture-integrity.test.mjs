import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { motionValue } from "motion/react";

const require = createRequire(import.meta.url);
const { build } = createRequire(require.resolve("vite/package.json"))("esbuild");
const bundle = await build({
  entryPoints: [new URL("../src/components/construction/ConstructionSurface.jsx", import.meta.url).pathname],
  bundle: true, write: false, platform: "node", format: "cjs", packages: "external", jsx: "automatic",
});
const compiled = { exports: {} };
new Function("require", "module", "exports", bundle.outputFiles[0].text)(require, compiled, compiled.exports);
const Surface = compiled.exports.default;

test("keeps each product capture whole at every stage of its entrance", () => {
  for (const value of [0, 0.15, 0.4, 1]) {
    const html = renderToStaticMarkup(createElement(Surface, { src: "/capture.webp", alt: "Product screen", progress: motionValue(value) }));
    assert.equal((html.match(/<img\b/g) || []).length, 1, "a capture must not be split into duplicated, independently displaced fragments");
    assert.match(html, /alt="Product screen"/);
  }
});

test("keeps scene transitions from painting blank floating surfaces over the content", async () => {
  const source = await readFile(new URL("../src/components/construction/ConstructionDirector.jsx", import.meta.url), "utf8");
  assert.doesNotMatch(source, /className="construction-transfer(?:s)?"/, "the scene coordinator must not render the opaque transfer overlay");
});
