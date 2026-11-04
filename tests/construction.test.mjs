import assert from "node:assert/strict";
import test from "node:test";
import { acceptsTransition, scenePhase, sceneRange, storyBeat } from "../src/utils/construction.js";

test("holds the first story beat throughout construction and reaches every beat while reading", () => {
  assert.equal(storyBeat(0.25, 4), 0);
  assert.deepEqual([0.4, 0.52, 0.63, 0.74].map((p) => storyBeat(p, 4)), [0, 1, 2, 3]);
  assert.equal(storyBeat(1, 4), 3);
  assert.equal(storyBeat(-1, 4), 0);
  assert.equal(storyBeat(0.8, 1), 0);
});

test("preserves native modified clicks and only intercepts normal navigation", () => {
  const click = { button: 0, defaultPrevented: false };
  assert.equal(acceptsTransition(click), true);
  for (const key of ["metaKey", "ctrlKey", "shiftKey", "altKey", "defaultPrevented"]) {
    assert.equal(acceptsTransition({ ...click, [key]: true }), false);
  }
  assert.equal(acceptsTransition({ ...click, button: 1 }), false);
});

test("keeps scene ranges valid on short mobile content and reverses phase with scroll", () => {
  const range = sceneRange(100, 200, 800, 64, true);
  assert.ok(range.end > range.start);
  assert.deepEqual([0.1, 0.6, 0.9, 0.6].map(scenePhase), ["building", "reading", "transferring", "reading"]);
});
