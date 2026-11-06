import assert from "node:assert/strict";
import test from "node:test";
import { galleryPosition, visibleGalleryIndex } from "../src/utils/choreography.js";

test("the gallery holds each screen for reading and moves continuously between them", () => {
  assert.equal(galleryPosition(0), 0);
  assert.equal(galleryPosition(0.18), 0);
  assert.equal(galleryPosition(0.5), 0.5);
  assert.equal(galleryPosition(0.82), 1);
  assert.equal(galleryPosition(1), 1);
  assert.ok(Math.abs(galleryPosition(0.521) - galleryPosition(0.519)) < 0.01);
  let previous = 0;
  for (let step = 0; step <= 1000; step++) {
    const current = galleryPosition(step / 1000);
    assert.ok(current >= previous && current <= 1);
    previous = current;
  }
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
