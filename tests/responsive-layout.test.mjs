import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const css = await readFile(new URL("../src/index.css", import.meta.url), "utf8");

test("keeps the home composition readable in wide and short viewports", () => {
  assert.match(
    css,
    /font-size:\s*clamp\(3rem,\s*min\(7\.4vw,\s*11\.5svh\),\s*7\.6rem\)/,
    "the hero title must respond to both viewport width and height",
  );
  assert.match(
    css,
    /@media\s*\(min-width:\s*901px\)\s*and\s*\(max-height:\s*920px\)/,
    "wide, short screens need a compact desktop composition",
  );
  assert.match(
    css,
    /\.hero-section__stage\s*\{[^}]*min-height:\s*calc\(100svh\s*-\s*72px\)/s,
    "the hero stage must use the visible viewport height as a floor",
  );
});

test("reflows content before tablet columns become too narrow", () => {
  assert.match(
    css,
    /@media\s*\(max-width:\s*900px\)/,
    "the content-driven tablet breakpoint must activate by 900px",
  );
  assert.match(
    css,
    /height:\s*clamp\(360px,\s*115vw,\s*520px\)/,
    "mobile project media must scale instead of keeping a fixed 470px height",
  );
});
