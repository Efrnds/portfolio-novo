import { createContext, forwardRef, useContext, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { DemoBrowserNavigation } from "../portalContext";

export const SliceContext = createContext(null);
export const useSlice = () => useContext(SliceContext);
const notices = new Set();

export function SliceProvider({ kind, initialPath, children }) {
  const browser = useContext(DemoBrowserNavigation);
  const [localPath, setLocalPath] = useState(initialPath);
  const path = browser?.path ?? localPath;
  const setPath = browser?.navigate ?? setLocalPath;
  const [notice, setNotice] = useState("");
  const [session, setSession] = useState({ user: { id: "1", name: "Visitante (demo)", nome: "Visitante (demo)", nick: "visitante_demo", role: "cliente", image: null }, accessToken: "local-demo" });
  useEffect(() => { notices.add(setNotice); return () => notices.delete(setNotice); }, []);
  const value = useMemo(() => ({ kind, path, setPath, browser, notice, setNotice, session, setSession }), [kind, path, setPath, browser, notice, session]);
  return <SliceContext.Provider value={value}>{children}{notice && <div role="status" className="slice-notice" onClick={() => setNotice("")}>{notice}<button type="button" aria-label="Fechar aviso" onClick={() => setNotice("")}>×</button></div>}</SliceContext.Provider>;
}
SliceProvider.propTypes = { kind: PropTypes.string.isRequired, initialPath: PropTypes.string.isRequired, children: PropTypes.node };

const sites = { trato: "https://trato.prismap.com.br", calmera: "https://calmera.prismapp.com.br", opinioteca: "https://opinioteca.prismapp.com.br", vwrks: "https://vwrks.cc" };
const localRoutes = { calmera: /^\/(busca|linha)([/?]|$)/, opinioteca: /^\/(home|explorar)([/?]|$)/, trato: /^\/agendar([/?]|$)/, vwrks: /^\/(trabalho|sobre)([/?]|$)/ };

export const Link = forwardRef(function Link({ href = "#", children, onClick, ...props }, ref) {
  delete props.prefetch;
  const slice = useSlice();
  const url = typeof href === "string" ? href : href.pathname;
  const local = localRoutes[slice.kind].test(url);
  return <a {...props} ref={ref} href={local ? `#${url}` : new URL(url, sites[slice.kind]).href} target={local ? undefined : "_blank"} rel={local ? undefined : "noopener noreferrer"} onClick={(event) => {
    onClick?.(event);
    if (!event.defaultPrevented && local && !event.metaKey && !event.ctrlKey && !event.shiftKey && event.button === 0) {
      event.preventDefault(); slice.setPath(url);
    }
  }}>{children}</a>;
});
Link.propTypes = { href: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({ pathname: PropTypes.string })]), children: PropTypes.node, onClick: PropTypes.func, prefetch: PropTypes.bool };

export const Image = forwardRef(function Image({ src, alt = "", fill, priority, loading, onLoadingComplete, style, ...props }, ref) {
  delete props.unoptimized;
  delete props.quality;
  const slice = useSlice();
  const path = typeof src === "string" ? src : src?.src;
  const asset = path?.replace(/^\/?(assets|cursors)\//, "/$1/").replace("/assets/mobilepages/", "/assets/pages/");
  const mapped = /^\/(assets|cursors)\//.test(asset) ? `/product-slices/${slice.kind}${asset}` : path === "/Prancheta%2005.png" || path === "/Prancheta 05.png" ? "/product-slices/calmera/logo.png" : path;
  return <img {...props} ref={ref} src={mapped} alt={alt} loading={priority ? "eager" : loading ?? "lazy"} style={{ ...(fill ? { position: "absolute", inset: 0, width: "100%", height: "100%" } : {}), ...style }} onLoad={(event) => { props.onLoad?.(event); onLoadingComplete?.(event.currentTarget); }} />;
});
Image.propTypes = { src: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({ src: PropTypes.string })]), alt: PropTypes.string, fill: PropTypes.bool, priority: PropTypes.bool, loading: PropTypes.oneOf(["lazy", "eager"]), onLoadingComplete: PropTypes.func, style: PropTypes.object, onLoad: PropTypes.func, unoptimized: PropTypes.bool, quality: PropTypes.number };

export const usePathname = () => useSlice().path.split("?")[0];
export function useSearchParams() { const { path } = useSlice(); return useMemo(() => new URLSearchParams(path.split("?")[1]), [path]); }
export function useRouter() {
  const { setPath, kind, browser } = useSlice();
  return useMemo(() => {
    const navigate = (url) => localRoutes[kind].test(url) ? setPath(url) : window.open(new URL(url, sites[kind]).href, "_blank", "noopener,noreferrer");
    return { push: navigate, replace: (url) => localRoutes[kind].test(url) ? setPath(url, true) : navigate(url), prefetch() {}, refresh() {}, back() { if (browser) browser.back(); else setPath(kind === "vwrks" ? "/trabalho" : "/home"); } };
  }, [setPath, kind, browser]);
}
export function useSession() { const { session } = useSlice(); return { data: session, status: session ? "authenticated" : "unauthenticated", update: async () => session }; }
export const signOut = async () => {};
export const signIn = async () => ({ ok: true });
export const toast = { success(message) { notices.forEach((notify) => notify(message)); }, error(message) { notices.forEach((notify) => notify(message)); } };
