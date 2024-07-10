import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Main from "./components/Main";
import SakuraVerse from "./components/SakuraVerse";
import Footer from "./components/Footer"
function App() {
    return (
        <BrowserRouter>
            <div className="font-Urbanist" id="index">
                <Header />
                <hr className="mx-5 border-2 border-black sm:mx-10" />
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/SakuraVerse" element={<SakuraVerse />} />
                </Routes>
                <hr className="mx-5 border-2 border-black sm:mx-10" />
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;
