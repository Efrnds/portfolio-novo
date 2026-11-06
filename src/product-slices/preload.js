const loaders = {
  trato: () => Promise.all([import("./generated/trato.mjs"), import("./generated/trato.css?raw")]),
  opinioteca: () => Promise.all([import("./generated/opinioteca.mjs"), import("./generated/opinioteca.css?raw")]),
  calmera: () => Promise.all([import("./generated/calmera.mjs"), import("./generated/calmera.css?raw")]),
  vwrks: () => Promise.all([import("./generated/vwrks.mjs"), import("./generated/vwrks.css?raw")]),
};
const pending = new Map();

export function loadProduct(kind) {
  kind = kind === "calmera-os" ? "calmera" : kind;
  if (!loaders[kind]) return Promise.resolve(null);
  if (!pending.has(kind)) pending.set(kind, loaders[kind]().catch((error) => { pending.delete(kind); throw error; }));
  return pending.get(kind);
}

export function prepareProduct(kind) { void loadProduct(kind).catch(() => {}); }
