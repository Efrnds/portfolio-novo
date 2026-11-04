import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const [about, caseMotion, css, projectCard] = await Promise.all([
  readFile(new URL("../src/components/About.jsx", import.meta.url), "utf8"),
  readFile(new URL("../src/components/project-cases/CaseMotion.jsx", import.meta.url), "utf8"),
  readFile(new URL("../src/index.css", import.meta.url), "utf8"),
  readFile(new URL("../src/components/ProjectCard.jsx", import.meta.url), "utf8"),
]);

test("preserves the portfolio's EF signature without sacrificing the product stories", () => {
  assert.match(about, /hero-signature__mark/);
  assert.match(css, /\.project-story\s*\{/);
});

test("uses purposeful scroll choreography without endless motion", () => {
  assert.match(caseMotion, /useTransform|useScroll|useSpring/);
  assert.match(caseMotion, /case-hero-media/);
  assert.doesNotMatch(css, /transition-all|vwrks-color-drift/);
});

test("fires content changes from scroll position while using the shared scene coordinator", () => {
  assert.match(projectCard, /useMotionValueEvent\(scrollYProgress/);
  assert.match(caseMotion, /offset:\s*\["start 72px",\s*"end end"\]/);
  assert.match(projectCard, /useConstructionScene/);
});

test("keeps portfolio surfaces square to the viewport without decorative tilting or zoom", () => {
  assert.doesNotMatch(projectCard, /stageRotate|stageScale|rotate:/);
  assert.doesNotMatch(caseMotion, /rotate:|const (?:rotate|scale|y) = useTransform/);
  assert.doesNotMatch(css, /transform:\s*rotate\(/);
});
