import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useLanguage } from "../../../i18n/LanguageContext";
import { environmentCopy } from "./copy";
import { DemoFooter, Environment } from "./shared";

const views = [{ id: "home", src: "/images/vwrks/home.webp" }, { id: "work", src: "/images/vwrks/works.webp" }, { id: "project", src: "/images/vwrks/project.webp" }, { id: "about", src: "/images/vwrks/about.webp" }, { id: "archive", src: "/images/vwrks/archive.webp" }];

export default function VwrksEnvironment() {
  const { language } = useLanguage();
  const text = environmentCopy[language].vwrks;
  const reduced = useReducedMotion();
  const [view, setView] = useState("work");
  const selected = views.find((item) => item.id === view);
  return <Environment kind="vwrks" title={text.title}>
    <div className="vwrks-native-bar"><span className="vwrks-native-brand">V<span aria-hidden="true">®</span></span><nav aria-label="Vwrks">{views.map((item) => <button key={item.id} type="button" aria-pressed={view === item.id} onClick={() => setView(item.id)}>{text[item.id]}</button>)}</nav></div>
    <header className="product-environment__heading"><h2>{text.title}</h2><p>{text.intro}</p></header>
    <motion.figure key={view} className="vwrks-native-page" initial={reduced ? false : { y: 20 }} animate={{ y: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}><img src={selected.src} alt={`Vwrks: ${text[view]}`} width="3960" height="2160" /><figcaption>{text[view]}</figcaption></motion.figure>
    <DemoFooter note={text.note} href="https://vwrks.cc" />
  </Environment>;
}
