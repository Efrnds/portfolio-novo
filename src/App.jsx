import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./Layout/Header";
import Main from "./Layout/Main";
import Footer from "./Layout/Footer";
import ProjectPage from "./pages/ProjectPage";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen font-Urbanist" id="index">
        <Header />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/projects/:slug" element={<ProjectPage />} />
            {/* Legacy paths */}
            <Route path="/Y" element={<Navigate to="/projects/y" replace />} />
            <Route path="/y" element={<Navigate to="/projects/y" replace />} />
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
              element={<Navigate to="/projects/property-system" replace />}
            />
            <Route
              path="/patrimonio"
              element={<Navigate to="/projects/property-system" replace />}
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        <hr className="mx-5 sm:mx-8 lg:mx-12 border border-black" />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
