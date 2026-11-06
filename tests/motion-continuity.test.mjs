import assert from "node:assert/strict";
import test from "node:test";
import { nextGalleryState, visibleGalleryIndex } from "../src/utils/choreography.js";

test("stopping anywhere in the scene gives the gallery a whole screen as its destination", () => {
  let state = { index: 0 };
  for (let step = 0; step <= 100; step++) {
    state = nextGalleryState(state, step / 100);
    assert.ok(state.index === 0 || state.index === 1);
  }
  assert.equal(state.index, 1);
  for (let step = 100; step >= 0; step--) state = nextGalleryState(state, step / 100);
  assert.equal(state.index, 0);
});

test("a manual selection holds while scrolling toward it and rejoins after reaching its reading window", () => {
  let state = { index: 1, manualOrigin: 0.1 };
  for (const progress of [0.12, 0.2, 0.3, 0.5]) {
    state = nextGalleryState(state, progress);
    assert.equal(state.index, 1);
  }
  state = nextGalleryState(state, 0.7);
  assert.equal(state.manualOrigin, undefined);
  assert.equal(nextGalleryState(state, 0.4).index, 0);
});

test("reversing away from a manually selected screen releases it without a jump in the document", () => {
  assert.equal(nextGalleryState({ index: 1, manualOrigin: 0.3 }, 0.2).index, 0);
  assert.equal(nextGalleryState({ index: 0, manualOrigin: 0.7 }, 0.8).index, 1);
  assert.equal(nextGalleryState({ index: 1, manualOrigin: 0.5 }, 0.49).index, 1);
});

test("small scroll reversals near the middle do not chatter between captions", () => {
  let current = 0;
  for (const position of [0.48, 0.52, 0.49, 0.54]) current = visibleGalleryIndex(position, current);
  assert.equal(current, 0);
  current = visibleGalleryIndex(0.6, current);
  assert.equal(current, 1);
  for (const position of [0.52, 0.48, 0.51, 0.46]) current = visibleGalleryIndex(position, current);
  assert.equal(current, 1);
  assert.equal(visibleGalleryIndex(0.4, current), 0);
});
