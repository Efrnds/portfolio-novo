import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import test from "node:test";
import { demoBooks, demoCandles } from "../src/data/productDemos.js";
import { vwrksWorks } from "../src/data/vwrksDemo.js";
import { availableDemoSlots, bookingReducer, cartReducer, cartTotal, initialBookingState, initialReaderState, readerReducer } from "../src/utils/productDemos.js";

test("reserving a demo appointment removes overlapping starts and cancelling restores them", () => {
  let state = bookingReducer(initialBookingState, { type: "reserve", serviceId: "complete", day: "2026-11-05", time: "10:00", name: " Visitor " });
  assert.equal(state.bookings[0].name, "Visitor");
  assert.equal(state.bookings[0].minutes, 60);
  const slots = availableDemoSlots(state.bookings, "2026-11-05", 60);
  for (const time of ["09:30", "10:00", "10:30"]) assert.ok(!slots.includes(time));
  assert.ok(slots.includes("09:00") && slots.includes("11:00"));
  const conflict = bookingReducer(state, { type: "reserve", serviceId: "cut", day: "2026-11-05", time: "10:30", name: "Visitor" });
  assert.equal(conflict.error, "busy");
  assert.equal(conflict.bookings.length, 1);
  assert.ok(availableDemoSlots(state.bookings, "2026-11-06", 60).includes("10:00"));
  state = bookingReducer(state, { type: "cancel", id: state.bookings[0].id });
  assert.ok(availableDemoSlots(state.bookings, "2026-11-05", 60).includes("10:00"));
  assert.equal(bookingReducer(state, { type: "reserve", serviceId: "unknown" }).error, "invalid");
});

test("reader actions save a book, publish a review, and toggle a reaction locally", () => {
  let state = readerReducer(initialReaderState, { type: "save", bookId: "santo" });
  assert.deepEqual(state.saved, ["santo"]);
  state = readerReducer(state, { type: "publish", bookId: "santo", rating: 4, body: " My reading note. " });
  assert.equal(state.posts[0].body, "My reading note.");
  state = readerReducer(state, { type: "like", id: state.posts[0].id });
  assert.equal(state.posts[0].liked, true);
  state = readerReducer(state, { type: "like", id: state.posts[0].id });
  assert.equal(state.posts[0].liked, false);
  state = readerReducer(state, { type: "save", bookId: "santo" });
  assert.deepEqual(state.saved, []);
  assert.equal(readerReducer(state, { type: "publish", bookId: "santo", rating: 0, body: "note" }).posts.length, 1);
  assert.equal(readerReducer(state, { type: "publish", bookId: "missing", rating: 4, body: "note" }).error, "invalid");
});

test("the candle cart calculates totals in cents and removes zero-quantity items", () => {
  let cart = cartReducer({}, { type: "add", id: "lavender" });
  cart = cartReducer(cart, { type: "add", id: "bamboo" });
  assert.equal(cartTotal(cart), 9998);
  cart = cartReducer(cart, { type: "quantity", id: "lavender", quantity: 2 });
  assert.equal(cartTotal(cart), 14997);
  assert.deepEqual(cartReducer(cart, { type: "quantity", id: "bamboo", quantity: -1 }), cart);
  cart = cartReducer(cart, { type: "quantity", id: "bamboo", quantity: 0 });
  assert.ok(!Object.hasOwn(cart, "bamboo"));
  assert.deepEqual(cartReducer(cart, { type: "add", id: "unknown" }), cart);
  assert.deepEqual(cartReducer(cart, { type: "reset" }), {});
});

test("product imagery references real captures and crops stay inside their sources", async () => {
  for (const item of [...demoBooks, ...demoCandles]) {
    await access(new URL(`../public${item.source}`, import.meta.url));
    const [x, y, width, height] = item.crop;
    assert.ok(x >= 0 && y >= 0 && x + width <= item.size[0] && y + height <= item.size[1]);
  }
  for (const work of vwrksWorks) {
    for (const image of work.images) await access(new URL(`../public${image}`, import.meta.url));
  }
});
