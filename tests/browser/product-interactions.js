import { flushSync } from "react-dom";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const click = (node) => { if (!node) throw new Error("Missing product control"); flushSync(() => node.click()); };
function input(node, value) {
  if (!node) throw new Error("Missing product input");
  const prototype = node.tagName === "TEXTAREA" ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
  Object.getOwnPropertyDescriptor(prototype, "value").set.call(node, value);
  node.dispatchEvent(new Event("input", { bubbles: true, composed: true }));
  node.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
}

export async function exerciseProduct(shadow, kind, check) {
  const text = (selector, value) => [...shadow.querySelectorAll(selector)].find((node) => node.textContent.includes(value));
  if (kind === "calmera") {
    const logo = shadow.querySelector('img[alt="Calmera"]').getBoundingClientRect();
    const cart = shadow.querySelector('[data-slot="sheet-trigger"]').getBoundingClientRect();
    check("store logo and bag keep separate space", logo.right <= cart.left + 1 || logo.bottom <= cart.top + 1, { logo: [logo.right, logo.bottom], cart: [cart.left, cart.top] });
    check("original catalog has its three candles", shadow.querySelectorAll("article").length === 3);
    click(text("button", "Adicionar"));
    const scrollArea = shadow.querySelector("[data-browser-scroll]");
    scrollArea.scrollTo({ top: 200, behavior: "instant" }); await wait(100);
    click(shadow.querySelector('[data-slot="sheet-trigger"]'));
    await wait(450);
    const bag = shadow.querySelector('[data-slot="sheet-content"]');
    check("bag opens with selected item and its subtotal", bag?.textContent.includes("Lavanda") && bag.textContent.includes("49,99"));
    const viewport = shadow.host.closest("[data-browser-viewport]").getBoundingClientRect();
    const bagBounds = bag.getBoundingClientRect();
    check("bag stays inside the browser window", bagBounds.left >= viewport.left - 1 && bagBounds.top >= viewport.top - 1 && bagBounds.right <= viewport.right + 1 && bagBounds.bottom <= viewport.bottom + 1, { top: bagBounds.top, bottom: bagBounds.bottom, viewport: [viewport.top, viewport.bottom] });
    check("product dialog leaves browser controls available", document.body.style.pointerEvents !== "none");
    check("bag finishes its entrance", bag && Math.abs(new DOMMatrix(getComputedStyle(bag).transform).m41) < 1);
    const quantity = bag.querySelector('input[aria-label="Quantidade"]');
    quantity.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true, composed: true, pointerType: "mouse", pointerId: 1, isPrimary: true, button: 0 }));
    quantity.focus({ preventScroll: true });
    input(quantity, "2"); await wait(400);
    check("cart quantity updates the subtotal without dismissing the drawer", bag.isConnected && bag.textContent.includes("99,98") && quantity.value === "2");
    const remove = [...bag.querySelectorAll("button")].find((button) => button.textContent === "Remover");
    remove.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true, composed: true, pointerType: "mouse", pointerId: 1, isPrimary: true, button: 0 }));
    click(remove); await wait(250);
    check("cart removes items and keeps the empty drawer usable", bag.isConnected && bag.textContent.includes("Seu carrinho está vazio"));
    const trigger = shadow.querySelector('[data-slot="sheet-trigger"]');
    const close = bag.querySelector('[data-slot="sheet-close"]');
    click(close);
    await wait(90);
    if (!matchMedia("(prefers-reduced-motion: reduce)").matches) check("bag remains mounted while exiting", !!shadow.querySelector('[data-slot="sheet-content"][data-state="closed"]'));
    await wait(300);
    check("bag exits completely", !shadow.querySelector('[data-slot="sheet-content"]'));
    click(trigger); await wait(70); click(shadow.querySelector('[data-slot="sheet-close"]'));
    await wait(400);
    check("interrupted bag entrance releases its modal", !shadow.querySelector('[role="dialog"]') && document.body.style.pointerEvents !== "none");
    const search = shadow.querySelector("header input");
    input(search, "bambu"); await wait(60);
    flushSync(() => search.closest("form").dispatchEvent(new Event("submit", { bubbles: true, cancelable: true })));
    await wait(400);
    check("catalog search updates the product and the browser address", shadow.querySelectorAll("article").length === 1 && document.querySelector("[data-browser-address]").textContent.includes("q=bambu"));
  }
  if (kind === "opinioteca") {
    const search = shadow.querySelector('header input[placeholder*="Buscar"]');
    input(search, "santo"); await wait(450);
    const result = shadow.querySelector('header a[href*="/livros/"]');
    result?.dispatchEvent(new MouseEvent("mousedown", { bubbles: true, composed: true }));
    check("search results survive pointer down", result?.isConnected);
    input(search, ""); await wait(100);
    const vote = shadow.querySelector('button[aria-label*="positivo"],button[aria-label*="Upvote"],button[title*="Upvote"]');
    click(vote); await wait(150);
    check("vote updates the original card", vote.textContent.includes("1"));
    const comments = shadow.querySelector('button[aria-label*="coment"],button[title*="coment"]') ?? [...shadow.querySelectorAll("button")].find((node) => node.querySelector("svg.lucide-message-circle"));
    click(comments); await wait(180);
    const field = shadow.querySelector('textarea,input[placeholder*="coment"]');
    field.focus({ preventScroll: true });
    input(field, "Leitura compartilhada no recorte real"); await wait(60);
    click(shadow.querySelector('button[type="submit"]')); await wait(450);
    check("comment and count update together", shadow.textContent.includes("Leitura compartilhada no recorte real") && comments.textContent.includes("1"));
    check("comment insertion preserves the composer", field.isConnected && field === shadow.activeElement);
    const offsets = [...shadow.querySelectorAll("[data-demo-post],[data-demo-comment]")].map((node) => new DOMMatrix(getComputedStyle(node).transform).m42);
    check("feed settles after making room", offsets.every((offset) => Math.abs(offset) < 1), offsets);
    click(text("a", "Explorar")); await wait(300);
    check("discovery remains inside the product", shadow.textContent.includes("Livros em alta"));
  }
  if (kind === "trato") {
    const plus = shadow.querySelector('button[aria-label*="Adicionar"]') ?? [...shadow.querySelectorAll("button")].find((node) => node.querySelector("svg.lucide-plus"));
    click(plus); await wait(80);
    const beforeHeight = shadow.querySelector("[data-demo-step]").offsetHeight;
    click(text("button", "Continuar")); await wait(90);
    const duringHeight = shadow.querySelector("[data-demo-step]").offsetHeight;
    await wait(360);
    const afterHeight = shadow.querySelector("[data-demo-step]").offsetHeight;
    if (!matchMedia("(prefers-reduced-motion: reduce)").matches && Math.abs(beforeHeight - afterHeight) > 8) {
      const progress = Math.abs(duringHeight - beforeHeight) / Math.abs(afterHeight - beforeHeight);
      check("booking height changes continuously between steps", progress > 0.1 && progress < 0.85, { beforeHeight, duringHeight, afterHeight, progress });
    }
    check("service advances to professional", shadow.textContent.includes("Profissional A"));
    const stage = shadow.querySelector("[data-demo-step]");
    check("booking step settles without opacity choreography", getComputedStyle(stage.querySelector(".animate-in")).opacity === "1");
    click(text("h3", "Profissional A")?.closest('[data-slot="card"]')); await wait(80);
    click(text("button", "Continuar")); await wait(450);
    check("booking reaches date and time", shadow.textContent.includes("3. Data e Hora"));
    const date = [...shadow.querySelectorAll("button[aria-label]")].find((node) => /^\d\d\/\d\d\/\d{4}$/.test(node.getAttribute("aria-label")) && !node.disabled);
    click(date); await wait(200);
    click(text("button", "09:00")); await wait(80);
    click(text("button", "Confirmar Agendamento")); await wait(450);
    check("booking reaches confirmation", shadow.textContent.includes("Agendamento") && !shadow.textContent.includes("3. Data e Hora"));
  }
  if (kind === "vwrks") {
    check("original work gallery is present", shadow.textContent.includes("Trabalhos Selecionados") && shadow.querySelectorAll("img").length > 10);
    check("responsive gallery uses available original media", ![...shadow.querySelectorAll("img")].some((node) => node.src.includes("/mobilepages/")));
    const viewport = shadow.querySelector("[data-browser-scroll]");
    viewport.scrollTo({ top: viewport.scrollHeight, behavior: "instant" }); await wait(700);
    const plena = [...shadow.querySelectorAll("img")].filter((image) => image.src.includes("01-Plena"));
    await Promise.race([Promise.allSettled(plena.map((image) => image.decode())), wait(1500)]);
    check("every Plena frame decodes when the project is reached", plena.length === 5 && plena.every((image) => image.naturalWidth > 0), plena.map((image) => ({ src: image.src, loaded: image.naturalWidth, complete: image.complete })));
    viewport.scrollTo({ top: 0, behavior: "instant" });
    click(text("a", "SOBRE")); await wait(300);
    check("original about navigation remains local", /EXPERIÊNCIAS|Experiências/.test(shadow.textContent));
    check("Vwrks leaves the main navbar neutral", !document.documentElement.style.animation && getComputedStyle(document.querySelector(".site-header")).backgroundColor !== "rgba(0, 0, 0, 0)");
  }
}
