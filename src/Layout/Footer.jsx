function Footer() {
  const toTheTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="site-footer">
      <div className="site-footer__cta">
        <p className="eyebrow">Open channel</p>
        <h2>Have a system that needs to work beyond the demo?</h2>
        <a href="mailto:contato.efrnds@outlook.com" className="action-link action-link--light">
          Tell me where it gets difficult
        </a>
      </div>

      <div className="site-footer__bottom">
        <p>© {new Date().getFullYear()} Eduardo Fernandes</p>
        <p>Umuarama, Brazil / BRT</p>
        <nav aria-label="Social links">
          <a href="https://github.com/Efrnds" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href="https://linkedin.com/in/edudfrs" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </nav>
        <button type="button" onClick={toTheTop}>
          Back to top <span aria-hidden="true">↑</span>
        </button>
      </div>
    </footer>
  );
}

export default Footer;
