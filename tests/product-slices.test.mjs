import assert from "node:assert/strict";
import test from "node:test";
import { createDemoRequest } from "../src/product-slices/screens/api.js";

test("a vote from the original Opinioteca card updates and then clears its count", async () => {
  const request = createDemoRequest("opinioteca");
  const vote = await (await request("/api/avaliacoes/1/voto", { method: "POST", body: JSON.stringify({ tipo_voto: "upvote" }) })).json();
  assert.deepEqual(vote.votos, { upvotes: 1, downvotes: 0, score: 1 });
  const cleared = await (await request("/api/avaliacoes/1/voto", { method: "DELETE" })).json();
  assert.equal(cleared.votos.score, 0);
});

test("the original comment composer receives a comment and retrieves it after reloading", async () => {
  const request = createDemoRequest("opinioteca");
  const comment = await (await request("/api/avaliacoes/1/comentarios", { method: "POST", body: JSON.stringify({ texto: " Uma conversa sobre livros " }) })).json();
  assert.equal(comment.texto, "Uma conversa sobre livros");
  const comments = await (await request("/api/avaliacoes/1/comentarios")).json();
  assert.equal(comments.length, 1);
  assert.equal(comments[0].id, comment.id);
  assert.equal((await (await request("/api/avaliacoes")).json()).itens[0].qtd_comentarios, 1);
});

test("a new comment notifies the original feed so its counter stays in sync", async () => {
  const events = [];
  const request = createDemoRequest("opinioteca", (type, payload) => events.push({ type, payload }));
  await request("/api/avaliacoes/1/comentarios", { method: "POST", body: JSON.stringify({ texto: "Teste do contador" }) });
  assert.equal(events[0]?.type, "NOVO_COMENTARIO");
  assert.equal(events[0].payload.qtd_comentarios, 1);
  assert.equal(events[0].payload.avaliacao_id, 1);
});

test("votes on comments in different posts update the intended conversation", async () => {
  const request = createDemoRequest("opinioteca");
  const post = (id) => request(`/api/avaliacoes/${id}/comentarios`, { method: "POST", body: JSON.stringify({ texto: `Comentário no post ${id}` }) });
  const first = await (await post(1)).json();
  const second = await (await post(2)).json();
  assert.notEqual(first.id, second.id);
  await request(`/api/comentarios/${second.id}/voto`, { method: "POST", body: JSON.stringify({ tipo_voto: "upvote" }) });
  assert.equal((await (await request("/api/avaliacoes/1/comentarios")).json())[0].votos, 0);
  assert.equal((await (await request("/api/avaliacoes/2/comentarios")).json())[0].votos, 1);
});

test("the Calmera bag receives the same quotation shape as its original drawer", async () => {
  const request = createDemoRequest("calmera");
  const quote = await (await request("/api/checkout/quote", { method: "POST", body: JSON.stringify({ items: [{ recipeId: "lavender", quantity: 2 }] }) })).json();
  assert.equal(quote.lines[0].totalPrice, 99.98);
  assert.equal(quote.lines[0].quantity, 2);
});

test("unknown demo actions never fall through to the production server", async () => {
  let networkCalls = 0;
  const originalFetch = globalThis.fetch;
  globalThis.fetch = () => { networkCalls++; throw new Error("Production request"); };
  try {
    for (const kind of ["trato", "opinioteca", "calmera"]) {
      const response = await createDemoRequest(kind)("/api/unsupported", { method: "POST" });
      assert.equal(response.status, 404);
    }
    assert.equal(networkCalls, 0);
  } finally { globalThis.fetch = originalFetch; }
});
