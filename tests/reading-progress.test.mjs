import assert from "node:assert/strict";
import test from "node:test";
import { calcularProgressoLeitura } from "../src/utils/readingProgress.js";

test("pages and percentages count only the new reading in the session", () => {
  const expected = { paginasLidas: 30, paginaAtual: 80, porcentagem: 40 };
  assert.deepEqual(calcularProgressoLeitura("paginas", 30, 25, 200), expected);
  assert.deepEqual(calcularProgressoLeitura("porcentagem", 40, 25, 200), expected);
});

test("small sessions never accumulate extra pages or finish a book early", () => {
  let percentage = 0;
  let pages = 0;
  for (let index = 0; index < 300; index++) {
    const result = calcularProgressoLeitura("paginas", 1, percentage, 300);
    assert.ok(result);
    percentage = result.porcentagem;
    pages += result.paginasLidas;
  }
  assert.equal(pages, 300);
  assert.equal(percentage, 100);
  assert.equal(calcularProgressoLeitura("porcentagem", 100, 99.9, 200).paginasLidas, 1);
});

test("invalid sessions, backwards progress and excess pages are rejected", () => {
  for (const args of [["paginas", 0, 0, 200], ["paginas", 201, 0, 200], ["paginas", 1.5, 0, 200], ["porcentagem", 20, 25, 200], ["porcentagem", 101, 0, 200], ["paginas", 1, 100, 200], ["paginas", 1, 0, 0], ["paginas", NaN, 0, 200]]) {
    assert.equal(calcularProgressoLeitura(...args), null);
  }
});
