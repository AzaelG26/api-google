import React from "react";
import { Link } from "react-router-dom";
import "../styles/header.css";

const Header: React.FC = () => {
    return (
        <header className="header">
            <div className="logo">
                <h1>DA Clothes</h1>
            </div>

            <nav className="nav">
                <ul>
                    <li><Link to="/">Inicio</Link></li>
                    <li><Link to="/men">Hombre</Link></li>
                    <li><Link to="/women">Mujer</Link></li>
                    <li><Link to="/children">Niños</Link></li>
                </ul>
            </nav>

            <div className="options-user">
                <Link to="/cart" >
                    <img width="20" height="20" src="https://img.icons8.com/ios-glyphs/30/shopping-cart--v1.png" alt="shopping-cart--v1"/>
                </Link>

                <Link to="/login">
                    <img width="20" height="20" src="https://img.icons8.com/ios-glyphs/30/user--v1.png" alt="user--v1"/>
                </Link>
            </div>
        </header>
    );
};

export default Header;