import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import test from "node:test";
import { renderEditorial } from "./editorial-render.mjs";

test("the home presents work, operations, about and contact in navigation order in both languages", () => {
  for (const language of ["en", "pt"]) {
    const html = renderEditorial(language);
    let previous = -1;
    for (const anchor of ["work", "experience", "about", "contact"]) {
      const position = html.indexOf(`id="${anchor}"`);
      assert.ok(position > previous, `${anchor} must exist after the previous destination`);
      assert.ok(html.includes(`href="/#${anchor}"`), `${anchor} must be reachable from the header`);
      previous = position;
    }
    for (const slug of ["trato", "opinioteca", "calmera-os", "vwrks", "texsa-tools"]) {
      assert.ok(html.includes(`href="/projects/${slug}"`), `${slug} must have a working case link`);
    }
    assert.equal((html.match(/<h1\b/g) || []).length, 1);
    assert.doesNotMatch(html, /undefined|NaN|construction-transfer/);
  }
});

test("product previews have a named selected view, readable caption and real media", async () => {
  for (const language of ["en", "pt"]) {
    for (const slug of ["trato", "opinioteca", "calmera-os"]) {
      const html = renderEditorial(language, slug);
      assert.equal((html.match(/aria-pressed="true"/g) || []).length, 2, "one language and one product view are selected");
      assert.match(html, /aria-live="polite"/);
      assert.match(html, /role="group" aria-label="[^"]+"/);
      const visibleCapture = html.match(/<img[^>]*alt="([^"\s][^"]*)"/);
      assert.ok(visibleCapture, `${slug} must identify its visible capture`);
      for (const match of html.matchAll(/(?:src|href)="(\/images\/[^"#]+)"/g)) {
        await access(new URL(`../public${match[1]}`, import.meta.url));
      }
    }
  }
});

test("project introductions lead straight into their interactive demos", () => {
  for (const language of ["en", "pt"]) {
    for (const slug of ["trato", "opinioteca", "calmera-os", "vwrks"]) {
      const html = renderEditorial(language, `/projects/${slug}`);
      const content = html.slice(html.indexOf('id="main-content"'));
      const afterIntroduction = content.slice(content.indexOf("</header>") + "</header>".length);
      assert.match(afterIntroduction, /^\s*<section class="product-slice\b/, `${slug} must open with its demo after the introduction`);
      assert.doesNotMatch(content, /data-route-hero|data-route-image|case-cover/);
    }
  }
});
