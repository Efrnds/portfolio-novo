import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import Header from "./Layout/Header";
import Main from "./Layout/Main";
import Footer from "./Layout/Footer";
import ProjectPage from "./pages/ProjectPage";
import ScrollToTop from "./components/ScrollToTop";
import DocumentMeta from "./components/DocumentMeta";
import JsonLd from "./components/JsonLd";

import ScrollProgress from "./components/ScrollProgress";
import GrainOverlay from "./components/GrainOverlay";
import { LanguageProvider, useLanguage } from "./i18n/LanguageContext";

function RouteCurtain() {
  const { pathname } = useLocation();
  const reduced = useReducedMotion();

  if (reduced) return null;

  return (
    <motion.div
      key={pathname}
      className="route-curtain"
      initial={{ scaleY: 1 }}
      animate={{ scaleY: 0 }}
      transition={{ duration: 0.32, ease: [0.76, 0, 0.24, 1] }}
      aria-hidden="true"
    />
  );
}

function AppShell() {
  const { copy } = useLanguage();

  return (
    <BrowserRouter>
      <ScrollToTop />
      <DocumentMeta />
      <JsonLd />
      <GrainOverlay />
      <ScrollProgress />
      <RouteCurtain />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-black focus:text-[#ece9df] focus:px-4 focus:py-2"
      >
        {copy.a11y.skip}
      </a>
      <div className="flex flex-col min-h-screen font-Urbanist" id="index">
        <Header />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/projects/:slug" element={<ProjectPage />} />
            <Route path="/Y" element={<Navigate to="/" replace />} />
            <Route path="/y" element={<Navigate to="/" replace />} />
            <Route
              path="/projects/y"
              element={<Navigate to="/" replace />}
            />
            <Route
              path="/Vwrks"
              element={<Navigate to="/projects/vwrks" replace />}
            />
            <Route
              path="/vwrks"
              element={<Navigate to="/projects/vwrks" replace />}
            />
            <Route
              path="/sistema-patrimonio"
              element={<Navigate to="/" replace />}
            />
            <Route path="/patrimonio" element={<Navigate to="/" replace />} />
            <Route
              path="/projects/property-system"
              element={<Navigate to="/" replace />}
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppShell />
    </LanguageProvider>
  );
}

export default App;
