import assert from "node:assert/strict";
import test from "node:test";
import { projects } from "../src/data/projects.js";

test("featured systems tell a complete content-driven story in both languages", () => {
  const featuredSystems = projects.filter((project) => project.film);

  assert.deepEqual(
    featuredSystems.map((project) => project.slug),
    ["trato", "opinioteca", "calmera-os"],
  );

  for (const project of featuredSystems) {
    assert.ok(project.story.length >= 3, `${project.slug} needs enough beats to explain its real flow`);
    assert.equal(project.i18n.pt.story.length, project.story.length, `${project.slug} must preserve its story in Portuguese`);
    assert.ok(project.film.id, `${project.slug} must declare its automatic video filename`);
    assert.ok(project.film.poster, `${project.slug} must keep a real fallback image`);
    assert.equal(project.film.frames.length, project.story.length, `${project.slug} must connect one real frame to each story beat`);

    for (const beat of [...project.story, ...project.i18n.pt.story]) {
      assert.ok(beat.label && beat.title && beat.body, `${project.slug} has an incomplete story beat`);
    }
  }
});
