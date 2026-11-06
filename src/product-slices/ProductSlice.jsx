import { lazy, Suspense, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import { DemoBrowserNavigation, PortalContainer } from "./portalContext";
import DemoBrowser from "./DemoBrowser";
import { initialPaths, movePage, visitPage } from "./browserHistory";
import { useLanguage } from "../i18n/LanguageContext";
import { loadProduct } from "./preload";
import { useProductMotion } from "./useProductMotion";
import productMotionStyles from "./motion.css?raw";
import "./product-slices.css";
import "./fonts.css";

const resets = {};
const screens = Object.fromEntries(["trato", "opinioteca", "calmera", "vwrks"].map((kind) => [kind, lazy(async () => {
  const [screen, stylesheet] = await loadProduct(kind);
  resets[kind] = screen.resetDemo;
  return { default: function Screen() { const Component = screen.default; return <><style>{stylesheet.default}</style><style>{embeddingStyles[kind]}</style><style>{productMotionStyles}</style><Component /></>; } };
})]));

const names = { trato: "Trato", opinioteca: "Opinioteca", calmera: "Calmera", vwrks: "Vwrks" };
const tasks = {
  en: { trato: "Choose a service and a professional, then try booking a time.", opinioteca: "Explore the feed, vote on a review and join the conversation.", calmera: "Search the catalog, add a candle and open your shopping bag.", vwrks: "Browse the work, hover over the images and visit the About page." },
  pt: { trato: "Escolha um serviço e um profissional e teste o agendamento.", opinioteca: "Explore o feed, vote em uma avaliação e participe nos comentários.", calmera: "Busque no catálogo, adicione uma vela e abra a sacola.", vwrks: "Explore os trabalhos, passe pelas imagens e visite a página Sobre." },
};

export default function ProductSlice({ kind, href }) {
  const { language } = useLanguage();
  const host = useRef(null);
  const [shadow, setShadow] = useState(null);
  const [version, setVersion] = useState(0);
  const [history, setHistory] = useState(() => ({ entries: [initialPaths[kind]], index: 0 }));
  const navigation = useMemo(() => ({
    path: history.entries[history.index], canBack: history.index > 0, canForward: history.index < history.entries.length - 1,
    navigate: (next, replace = false) => setHistory((current) => visitPage(current, typeof next === "function" ? next(current.entries[current.index]) : next, replace)),
    back: () => setHistory((current) => movePage(current, -1)), forward: () => setHistory((current) => movePage(current, 1)),
  }), [history]);
  useLayoutEffect(() => { host.current?.shadowRoot?.querySelector("[data-browser-scroll]")?.scrollTo({ top: 0, behavior: "instant" }); }, [navigation.path, version, shadow]);
  useProductMotion(shadow, kind);
  useEffect(() => { setShadow(host.current.shadowRoot ?? host.current.attachShadow({ mode: "open" })); }, []);
  const Screen = screens[kind];
  const reset = () => { resets[kind]?.(); setHistory({ entries: [initialPaths[kind]], index: 0 }); setVersion((current) => current + 1); };
  return <section className={`product-slice product-slice--${kind}`} data-product-environment={kind} aria-label={`${names[kind]} demo`}>
    <div className="product-slice__intro"><div><h2>{names[kind]}</h2><p>{tasks[language][kind]}</p></div></div>
    <div className="product-slice__stage"><DemoBrowser title={names[kind]} language={language} href={href} navigation={navigation} onReset={reset}>
      <div ref={host} className={kind === "trato" ? "dark" : undefined} data-product-slice={kind}>
        {shadow && createPortal(<DemoBrowserNavigation.Provider value={navigation}><PortalContainer.Provider value={shadow}><div className="slice-app" data-browser-scroll key={version} tabIndex={0} role="region" aria-label={language === "pt" ? `${names[kind]}: demonstração com rolagem` : `${names[kind]}: scrollable demo`}><Suspense fallback={<p className="slice-loading" role="status">{language === "pt" ? "Carregando a tela…" : "Loading the screen…"}</p>}><Screen /></Suspense></div></PortalContainer.Provider></DemoBrowserNavigation.Provider>, shadow)}
      </div>
    </DemoBrowser></div>
    <div className="product-slice__outro"><p>{language === "pt" ? "Tela do produto com dados de demonstração. As ações ficam nesta página." : "Product screen with demo data. Actions stay on this page."}</p></div>
  </section>;
}

ProductSlice.propTypes = { kind: PropTypes.oneOf(Object.keys(names)).isRequired, href: PropTypes.string.isRequired };

const common = `:host{display:block;min-width:0;height:100%!important;min-height:0!important;color-scheme:light}.slice-app{position:relative;contain:layout style;isolation:isolate;height:100%;min-height:0!important;min-width:0;overflow:auto;scrollbar-gutter:stable;font-size:16px;line-height:1.5}.slice-app *{box-sizing:border-box}.slice-app:focus-visible{outline:2px solid currentColor;outline-offset:-3px}button,a{touch-action:manipulation}button:not(:disabled),a{cursor:pointer}button:focus-visible,a:focus-visible,input:focus-visible,textarea:focus-visible{outline:2px solid currentColor;outline-offset:3px}.slice-loading{padding:80px 24px}.slice-notice{position:sticky;bottom:16px;z-index:100;max-width:560px;margin:16px auto;padding:16px 20px;border-radius:12px;background:#11120f;color:#fff;box-shadow:0 8px 24px #0003;font:14px/1.5 system-ui}.slice-notice button{margin-left:16px;font-size:20px}@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}}`;
const embeddingStyles = {
  calmera: `${common}:host{--font-sans:Montserrat,Arial,sans-serif;--font-serif:'Libre Baskerville',Georgia,serif;font-family:var(--font-sans)}.slice-app{font-family:var(--font-sans);background:#e5e3da;color:#000}.slice-app [data-slot=sheet-content]{background:#fff;color:#000}.slice-app [data-slot=sheet-overlay],.slice-app [data-slot=sheet-content]{position:fixed}@media(max-width:400px){.slice-app header>div{display:flex;flex-wrap:wrap;gap:10px}.slice-app header>div>*{flex:1 1 100%;min-width:0;max-width:100%}.slice-app header>div>div:nth-child(2){justify-content:flex-start}.slice-app header>div>nav{margin-inline:0}}`,
  opinioteca: `${common}:host{--layout-sticky-top:16px}.slice-app{font-family:'Gabarito-Regular',sans-serif;background:#e8eaed;color:#1b2432}.slice-app>div{min-height:780px}.slice-app main>aside{position:relative;top:auto;height:auto;max-height:none;overflow:visible}.slice-app header{position:relative!important;top:auto!important}img{max-width:100%}.slice-app main>section{padding-bottom:24px}.slice-app .min-h-screen{min-height:0}`,
  trato: `${common}:host{color-scheme:dark}.slice-app{font-family:'Nunito-Regular',sans-serif;background:#09090b;color:#fafafa}.slice-app [class*='sm:max-h-']{max-height:none!important;overflow-y:visible!important;padding-bottom:24px!important}.slice-app .fixed.z-\\[60\\]{position:relative!important;inset:auto!important;translate:none!important;transform:none!important;width:100%!important;margin-top:24px;padding-inline:0!important}.slice-app .fixed.z-\\[60\\]>div{max-width:100%!important;transform:none!important}.slice-app [class*='min-h-screen']{min-height:0!important}@media(max-width:640px){.slice-app [data-slice-trato-shell]>div{padding-inline:0!important}.slice-app [data-slice-calendar]{padding:0!important}}`,
  vwrks: `${common}.slice-app{font-family:'Authentic Sans 90',sans-serif;min-height:850px;padding-top:76px}.slice-app nav.fixed{position:absolute!important}.slice-app .navbar-gradient{background:transparent!important;animation:none!important}.slice-app .page-reveal{opacity:1!important;transition:none!important}.slice-app img{max-width:100%}.slice-app [class*='bottom-8']{display:none}.slice-app .min-h-screen{min-height:0}`,
};
