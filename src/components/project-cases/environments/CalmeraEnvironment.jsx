import { useId, useReducer, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { FiArrowRight, FiMinus, FiPlus, FiShoppingBag, FiX } from "react-icons/fi";
import { useLanguage } from "../../../i18n/LanguageContext";
import { demoCandles } from "../../../data/productDemos";
import { cartReducer, cartTotal } from "../../../utils/productDemos";
import { environmentCopy } from "./copy";
import ProductCrop from "./ProductCrop";
import { DemoFooter, Environment } from "./shared";

export default function CalmeraEnvironment() {
  const { language } = useLanguage();
  const copy = environmentCopy[language];
  const text = copy.calmera;
  const reduced = useReducedMotion();
  const [cart, dispatch] = useReducer(cartReducer, {});
  const [status, setStatus] = useState("");
  const dialog = useRef(null);
  const titleId = useId();
  const total = cartTotal(cart);
  const count = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  const money = (price) => new Intl.NumberFormat(language === "pt" ? "pt-BR" : "en", { style: "currency", currency: "BRL" }).format(price / 100);
  const reset = () => { dispatch({ type: "reset" }); setStatus(""); };

  return <Environment kind="calmera" title={text.title}>
    <div className="calmera-native-bar"><span className="calmera-native-brand">CALMERA</span><span>{text.collection}</span><button type="button" onClick={() => dialog.current.showModal()} aria-label={`${text.basket}: ${count}`}><FiShoppingBag aria-hidden="true" />{count}</button></div>
    <header className="product-environment__heading"><h2>{text.title}</h2><p>{text.intro}</p></header>
    <div className="calmera-native-products">
      {demoCandles.map((candle) => <article key={candle.id}><div className="calmera-native-product__image"><ProductCrop item={candle} label={candle.name[language]} /></div>
        <div className="calmera-native-product__copy"><span>{text.size}</span><h3>{candle.name[language]}</h3><p>{money(candle.price)}</p>
          <motion.button type="button" onClick={() => { dispatch({ type: "add", id: candle.id }); setStatus(`${candle.name[language]} — ${text.added}`); }} disabled={(cart[candle.id] || 0) >= 99} whileTap={reduced ? undefined : { scale: 0.985 }}>{text.add}<FiPlus aria-hidden="true" /></motion.button>
        </div></article>)}
    </div>
    <div className="calmera-native-status"><p role="status">{status}</p><button type="button" onClick={() => dialog.current.showModal()}>{text.basket} · {money(total)}<FiArrowRight aria-hidden="true" /></button></div>
    <DemoFooter note={text.note} reset={reset} href="https://calmera.prismapp.com.br" />
    <dialog ref={dialog} className="calmera-native-drawer" aria-labelledby={titleId} onClick={(event) => { if (event.target === dialog.current) { const rect = dialog.current.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right) dialog.current.close(); } }}>
      <div className="calmera-native-drawer__heading"><h3 id={titleId}>{text.basket}</h3><button type="button" onClick={() => dialog.current.close()} aria-label={text.close}><FiX /></button></div>
      <p className="calmera-native-drawer__note">{text.note}</p>
      {!count && <p className="calmera-native-drawer__empty">{text.empty}</p>}
      <div className="calmera-native-drawer__items">{demoCandles.filter((candle) => cart[candle.id]).map((candle) => <article key={candle.id}>
        <ProductCrop item={candle} label={candle.name[language]} /><div><h4>{candle.name[language]}</h4><p>{money(candle.price)}</p><div className="calmera-native-quantity" role="group" aria-label={`${text.quantity}: ${candle.name[language]}`}>
          <button type="button" onClick={() => { dispatch({ type: "quantity", id: candle.id, quantity: cart[candle.id] - 1 }); setStatus(""); }} aria-label={`${text.remove}: ${candle.name[language]}`}><FiMinus /></button><output aria-live="polite">{cart[candle.id]}</output><button type="button" onClick={() => { dispatch({ type: "add", id: candle.id }); setStatus(""); }} disabled={cart[candle.id] >= 99} aria-label={`${text.add}: ${candle.name[language]}`}><FiPlus /></button>
        </div></div></article>)}</div>
      <div className="calmera-native-drawer__total"><p><span>{text.total}</span><strong>{money(total)}</strong></p><button type="button" disabled={!count} onClick={() => setStatus(text.completed)}>{text.finish}<FiArrowRight aria-hidden="true" /></button><p role="status">{status === text.completed ? status : ""}</p></div>
    </dialog>
  </Environment>;
}
