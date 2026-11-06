import { createContext, useContext, useMemo, useState } from "react";
import { StoreNav } from "../upstream/calmera/StoreNav";
import { StoreRecipeGrid } from "../upstream/calmera/StoreRecipeGrid";
import { useSlice } from "../compat/framework";
import { candles } from "./api";

const CartContext = createContext(null);
export const useStoreCart = () => useContext(CartContext);

export default function Calmera() {
  const [items, setItems] = useState([]);
  const [meta, setMeta] = useState({ couponCode: null });
  const { path } = useSlice();
  const term = new URLSearchParams(path.split("?")[1]).get("q")?.trim() ?? "";
  const cards = candles.filter((item) => `${item.name} ${item.description}`.toLowerCase().includes(term.toLowerCase())).map((item) => term ? { ...item, search: { query: term, inName: item.name.toLowerCase().includes(term.toLowerCase()), inDescription: item.description.toLowerCase().includes(term.toLowerCase()) } } : item);
  const cart = useMemo(() => ({ items, meta, totalItems: items.reduce((total, item) => total + item.quantity, 0), syncStatus: "idle", checkoutDataReady: true,
    addOne(id) { setItems((current) => current.some((item) => item.recipeId === id) ? current.map((item) => item.recipeId === id ? { ...item, quantity: Math.min(99, item.quantity + 1) } : item) : [...current, { recipeId: id, quantity: 1 }]); },
    setQuantity(id, quantity) { setItems((current) => current.map((item) => item.recipeId === id ? { ...item, quantity: Math.max(0, Math.min(99, quantity)) } : item).filter((item) => item.quantity > 0)); },
    remove(id) { setItems((current) => current.filter((item) => item.recipeId !== id)); },
    patchMeta(patch) { setMeta((current) => ({ ...current, ...patch })); },
    replaceItems: setItems, clear() { setItems([]); },
  }), [items, meta]);
  return <CartContext.Provider value={cart}>
    <StoreNav lines={[{ id: "calmera", name: "Linha Calmera", slug: "calmera" }]} user={null} loginHref="https://calmera.prismapp.com.br/" storeName="Calmera" />
    <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 sm:py-12">
      <nav className="text-xs text-muted-foreground">Início <span className="mx-2">/</span><span className="text-foreground">Catálogo e busca</span></nav>
      <h1 className="mt-4 font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{term ? `Resultados para “${term}”` : "Catálogo completo"}</h1>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">Tudo o que está disponível para compra agora. Use a busca no topo para encontrar seu aroma.</p>
      <p className="mt-6 text-sm text-muted-foreground"><span className="font-semibold tabular-nums text-foreground">{cards.length}</span> produtos encontrados</p>
      <div className="mt-8"><StoreRecipeGrid items={cards} checkoutHref="/checkout" ctaLabel="Comprar agora" /></div>
    </div>
  </CartContext.Provider>;
}
