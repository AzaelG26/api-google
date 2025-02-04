import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header.tsx";
import Home from "./pages/Home.tsx";
import Login from "./pages/login.tsx";
import MenPage from "./pages/men.tsx";
import React from "react";

const AppContent: React.FC = () => {
    const location = useLocation();

    const hideHeader = location.pathname === "/login";



    return (
        <div>
            {!hideHeader && <Header />}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/men" element={<MenPage />} />
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