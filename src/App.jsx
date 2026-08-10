import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./Layout/Header";
import Main from "./Layout/Main";
import Footer from "./Layout/Footer";
import ProjectPage from "./pages/ProjectPage";
import ScrollToTop from "./components/ScrollToTop";
import DocumentMeta from "./components/DocumentMeta";
import JsonLd from "./components/JsonLd";

import ScrollProgress from "./components/ScrollProgress";
import GrainOverlay from "./components/GrainOverlay";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <DocumentMeta />
      <JsonLd />
      <GrainOverlay />
      <ScrollProgress />
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-black focus:text-[#f0f0e9] focus:px-4 focus:py-2"
      >
        Skip to content
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
        <hr className="mx-5 sm:mx-8 lg:mx-12 border border-black/20" />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
