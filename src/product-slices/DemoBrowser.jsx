import PropTypes from "prop-types";

const paths = {
  back: "m14 6-6 6 6 6M8 12h12",
  forward: "m10 6 6 6-6 6M16 12H4",
  reload: "M20 7v5h-5M19 12a7 7 0 1 0-2 5M20 7l-3-3",
  open: "M14 4h6v6M20 4 10 14M10 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-5",
};
function Icon({ name }) {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name]} /></svg>;
}
Icon.propTypes = { name: PropTypes.oneOf(Object.keys(paths)).isRequired };

export default function DemoBrowser({ title, language, href, navigation, onReset, children }) {
  const pt = language === "pt";
  const address = new URL(href).hostname + navigation.path;
  return <div className="demo-browser" data-demo-browser="">
    <div className="demo-browser__tabs">
      <div className="demo-browser__window-marks" aria-hidden="true"><i /><i /><i /></div>
      <p className="demo-browser__tab"><span aria-hidden="true">{title[0]}</span>{title}<small>{pt ? "demonstração" : "preview"}</small></p>
      <span className="demo-browser__caption">{pt ? "Dentro do portfólio" : "Inside the portfolio"}</span>
    </div>
    <div className="demo-browser__toolbar" role="group" aria-label={pt ? "Controles da demonstração" : "Demo browser controls"}>
      <button type="button" data-browser-back disabled={!navigation.canBack} onClick={navigation.back} aria-label={pt ? "Voltar na demonstração" : "Go back in the demo"} title={pt ? "Voltar" : "Back"}><Icon name="back" /></button>
      <button type="button" data-browser-forward disabled={!navigation.canForward} onClick={navigation.forward} aria-label={pt ? "Avançar na demonstração" : "Go forward in the demo"} title={pt ? "Avançar" : "Forward"}><Icon name="forward" /></button>
      <button type="button" data-browser-reset onClick={onReset} aria-label={pt ? "Recomeçar a demonstração" : "Restart the demo"} title={pt ? "Recomeçar" : "Restart"}><Icon name="reload" /></button>
      <div className="demo-browser__address" aria-label={pt ? "Página da demonstração" : "Demo page"} title={address}><span aria-hidden="true">↳</span><span data-browser-address>{address}</span></div>
      <a className="demo-browser__open" href={href} target="_blank" rel="noopener noreferrer" aria-label={pt ? `Abrir ${title} em outra aba` : `Open ${title} in a new tab`} title={pt ? "Abrir o produto" : "Open the product"}><span>{pt ? "Abrir site" : "Open site"}</span><Icon name="open" /></a>
    </div>
    <div className="demo-browser__viewport" data-browser-viewport>{children}</div>
    <div className="demo-browser__status"><span>{pt ? "Dados de demonstração" : "Demo data"}</span><span>{pt ? "Role dentro da janela" : "Scroll inside the window"}<span aria-hidden="true"> ↓</span></span></div>
  </div>;
}

DemoBrowser.propTypes = {
  title: PropTypes.string.isRequired, language: PropTypes.string.isRequired, href: PropTypes.string.isRequired,
  navigation: PropTypes.shape({ path: PropTypes.string, canBack: PropTypes.bool, canForward: PropTypes.bool, back: PropTypes.func, forward: PropTypes.func }).isRequired,
  onReset: PropTypes.func.isRequired, children: PropTypes.node.isRequired,
};
