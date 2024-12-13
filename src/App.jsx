import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Main from "./components/Main";
import Y from "./pages/Y";
import Patrimonio from "./pages/Patrimonio";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col h-screen font-Urbanist" id="index">
        <Header />
        <hr className="mx-5 border-2 border-black rounded-full sm:mx-10" />
        <div className="flex-1 ">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/Y" element={<Y />} />
            <Route path="/sistema-patrimonio" element={<Patrimonio />} />
          </Routes>
        </div>
        <hr className="mx-5 border-2 border-black rounded-full sm:mx-10" />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
