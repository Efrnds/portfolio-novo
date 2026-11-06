import assert from "node:assert/strict";
import test from "node:test";
import { visitPage, movePage } from "../src/product-slices/browserHistory.js";

test("a demo can go back and forward without navigating away from the portfolio", () => {
  let history = { entries: ["/home"], index: 0 };
  history = visitPage(history, "/explorar");
  assert.equal(history.entries[history.index], "/explorar");
  history = movePage(history, -1);
  assert.equal(history.entries[history.index], "/home");
  history = movePage(history, 1);
  assert.equal(history.entries[history.index], "/explorar");
  assert.equal(movePage(history, 1), history);
});

test("visiting another page after going back replaces the old forward journey", () => {
  let history = { entries: ["/busca", "/busca?q=lavanda", "/linha/calmera"], index: 1 };
  history = visitPage(history, "/busca?q=bambu");
  assert.deepEqual(history.entries, ["/busca", "/busca?q=lavanda", "/busca?q=bambu"]);
  assert.equal(history.index, 2);
});

test("replacing a search does not create extra back steps", () => {
  const history = { entries: ["/busca", "/busca?q=lavanda"], index: 1 };
  const replaced = visitPage(history, "/busca?q=bambu", true);
  assert.deepEqual(replaced.entries, ["/busca", "/busca?q=bambu"]);
  assert.equal(visitPage(replaced, "/busca?q=bambu"), replaced);
  assert.equal(movePage(movePage(replaced, -1), -1).index, 0);
});
