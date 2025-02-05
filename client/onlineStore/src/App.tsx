import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header.tsx";
import Home from "./pages/Home.tsx";
import Login from "./pages/login.tsx";
import MenPage from "./pages/men.tsx";
import Women from "./pages/women.tsx";
import Children from "./pages/children.tsx";
import React from "react";
import Cart from "./pages/Cart.tsx";

const AppContent: React.FC = () => {
    const location = useLocation();

    const hideHeader = location.pathname === "/login";



    return (
        <div>
            {!hideHeader && <Header />}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/login" element={<Login />} />
                <Route path="/men" element={<MenPage />} />
                <Route path="/women" element={<Women />} />
                <Route path="/children" element={<Children />} />
            </Routes>
        </div>
    );
};

const App: React.FC = () => {
    return (
        <Router>
            <AppContent />
        </Router>
    );
};

export default App;