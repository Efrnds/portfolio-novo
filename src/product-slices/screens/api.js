export const books = [
  { id: 1, titulo: "A cabeça do santo", autor: "Socorro Acioli", capa_url: "/product-slices/books/santo.svg", total_paginas: 176 },
  { id: 2, titulo: "Pachinko", autor: "Min Jin Lee", capa_url: "/product-slices/books/pachinko.svg", total_paginas: 528 },
  { id: 3, titulo: "Normal People", autor: "Sally Rooney", capa_url: "/product-slices/books/normal.svg", total_paginas: 288 },
];
export const candles = [
  { id: "lavender", name: "Vela 150ml - Lavanda", description: "Vela com aroma de lavanda. Produzida artesanalmente em pequenos lotes.", imageUrl: "/product-slices/candles/lavender.svg", kindLabel: "Vela", priceLabel: "R$ 49,99", price: 49.99 },
  { id: "bamboo", name: "Vela 150ml - Bambu", description: "Frescor de bambu para deixar o ambiente leve e acolhedor.", imageUrl: "/product-slices/candles/bamboo.svg", kindLabel: "Vela", priceLabel: "R$ 49,99", price: 49.99 },
  { id: "cinnamon", name: "Vela 150ml - Canela", description: "O aroma quente da canela em uma vela feita à mão.", imageUrl: "/product-slices/candles/cinnamon.svg", kindLabel: "Vela", priceLabel: "R$ 49,99", price: 49.99 },
];

function initialPosts() {
  return books.slice(0, 2).map((livro, index) => ({ id: index + 1, usuario: { id: index + 2, nome: index ? "Leitor B · demo" : "Leitor A · demo", nick: `leitor_${index + 1}_demo`, image: null, rankConfiabilidade: 0 }, livro, texto: index ? "Um livro também pode ser o começo de uma conversa. Este é um post de demonstração: abra os comentários e participe." : "Uma estante conta um pouco de quem a gente é. Este post é demonstrativo; experimente votar na avaliação ou escrever um comentário.", nota: index ? 5 : 4, votos: { upvotes: 0, downvotes: 0, score: 0 }, meu_voto: "", criado_em: new Date().toISOString(), qtd_comentarios: 0, contem_spoiler: false }));
}

const subscribers = new Set();
export function subscribeDemoEvents(callback) { subscribers.add(callback); return () => subscribers.delete(callback); }
const emitDemoEvent = (type, payload) => subscribers.forEach((callback) => callback(type, payload));

export function createDemoRequest(kind, emit = () => {}) {
  const posts = initialPosts();
  const comments = new Map();
  let nextCommentId = 100;
  const bookings = [];
  return async function request(input, options = {}) {
    const url = new URL(String(input), "https://demo.invalid");
    const path = url.pathname;
    const method = options.method ?? "GET";
    const body = options.body ? JSON.parse(options.body) : {};
    const response = (data, status = 200) => new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json" } });
    if (kind === "calmera" && path === "/api/checkout/quote") {
      const lines = (body.items ?? []).flatMap(({ recipeId, quantity }) => {
        const recipe = candles.find((item) => item.id === recipeId);
        return recipe && Number.isInteger(quantity) && quantity > 0 ? [{ recipeId, recipeName: recipe.name, quantity, unitPrice: recipe.price, totalPrice: Math.round(recipe.price * quantity * 100) / 100 }] : [];
      });
      return response({ lines, shippingBrl: 0, discountBrl: 0, couponInfo: null });
    }
    if (kind === "opinioteca") {
      if (path === "/api/avaliacoes") return response({ itens: posts, next_cursor: null });
      const match = path.match(/^\/api\/avaliacoes\/(\d+)\/(voto|comentarios)$/);
      if (match) {
        const post = posts.find((item) => item.id === Number(match[1]));
        if (!post) return response({ erro: "Avaliação não encontrada." }, 404);
        if (match[2] === "voto") {
          post.meu_voto = method === "DELETE" ? "" : body.tipo_voto;
          post.votos = { upvotes: post.meu_voto === "upvote" ? 1 : 0, downvotes: post.meu_voto === "downvote" ? 1 : 0, score: post.meu_voto === "upvote" ? 1 : post.meu_voto === "downvote" ? -1 : 0 };
          return response({ votos: post.votos, meu_voto: post.meu_voto });
        }
        const items = comments.get(post.id) ?? [];
        if (method === "POST") {
          if (!body.texto?.trim()) return response({ erro: "Escreva um comentário." }, 400);
          const comment = { id: nextCommentId++, usuario: { id: 1, nome: "Você · demo", nick: "visitante_demo" }, texto: body.texto.trim(), criado_em: new Date().toISOString(), votos: 0, voto_usuario: "", pai_id: body.pai_id ?? null };
          comments.set(post.id, [...items, comment]); post.qtd_comentarios++;
          emit("NOVO_COMENTARIO", { avaliacao_id: post.id, comentario: comment, qtd_comentarios: post.qtd_comentarios });
          return response(comment);
        }
        return response(items);
      }
      const commentVote = path.match(/^\/api\/comentarios\/(\d+)\/voto$/);
      if (commentVote) {
        for (const [postId, items] of comments) {
          const comment = items.find((item) => item.id === Number(commentVote[1]));
          if (!comment) continue;
          comment.voto_usuario = method === "DELETE" ? "" : body.tipo_voto;
          comment.votos = comment.voto_usuario === "upvote" ? 1 : comment.voto_usuario === "downvote" ? -1 : 0;
          emit("COMENTARIO_ATUALIZADO", { avaliacao_id: postId, comentario: comment });
          return response(comment);
        }
        return response({ erro: "Comentário não encontrado." }, 404);
      }
      if (path === "/api/pesquisa") return response({ usuarios: [], livros: books.filter((book) => book.titulo.toLowerCase().includes((url.searchParams.get("q") ?? "").toLowerCase())) });
      if (/descoberta\/usuarios/.test(path)) return response([]);
      if (/descoberta|explorar|livros/.test(path)) return response(books);
    }
    if (kind === "trato") {
      if (path === "/api/agendar/horarios") return response({ success: true, horarios: ["09:00", "09:30", "10:00", "10:30", "14:00", "14:30", "15:00", "15:30"], barbeariaFolga: false, mensagemFolga: null });
      if (path === "/api/agendar/publico" && method === "POST") {
        if (!body.servico_ids?.length || !body.barbeiro_id || !body.data_hora) return response({ success: false, message: "Selecione serviço, profissional, data e horário." }, 400);
        const booking = { ...body, id: bookings.length + 1, status: "agendado" }; bookings.push(booking);
        return response({ success: true, agendamento: booking });
      }
      if (path === "/api/agendar/publico/cliente") return response({ success: true, needsProfileCompletion: false, cliente: { id: 1, nome: "Visitante (demo)", telefone: "" } });
      if (/assinaturas/.test(path)) return response({ success: true, assinaturas: [], beneficios: {} });
      if (/agendamentos/.test(path)) return response({ success: true, agendamentos: bookings });
    }
    return response({ erro: "Esta ação está disponível no produto completo.", success: false }, 404);
  };
}

export let calmeraRequest = createDemoRequest("calmera");
export let opiniotecaRequest = createDemoRequest("opinioteca", emitDemoEvent);
export let tratoRequest = createDemoRequest("trato");
export function resetDemo(kind) {
  if (kind === "calmera") calmeraRequest = createDemoRequest(kind);
  if (kind === "opinioteca") opiniotecaRequest = createDemoRequest(kind, emitDemoEvent);
  if (kind === "trato") tratoRequest = createDemoRequest(kind);
}
