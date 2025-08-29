import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { Nav } from "react-bootstrap";

function Navbarr() {
    const location = useLocation();
    // Ajouter une classe spéciale pour Home
    const navbarClass = location.pathname === "/" ? "navbar navbar-home" : "navbar navbar-white";

    return (
        <nav className={navbarClass}>
            <ul className="navbar-links" style={{ marginTop: "44px" }}>
                <li className="dropdown">
                <Nav.Link href="#action1">
                    <Link to="/" >Home</Link>
                </Nav.Link>
                </li>
                <li>
                <Link to="/about">About</Link>
                </li>
                <li>
                <Link to="/library">Library</Link>
                </li>
                <li>
                <Link to="/contact">Contact</Link>
                </li>
                <li>
                <Link to="/register">Register</Link>
                </li>
            </ul>

            {/* Logo centré */}
            <div className="navbar-logo">
                <img
                src="/Logo.png"
                alt="ReadLoop Logo"
                style={{ width: "150px", height: "75px" }}
                />
            </div>

            <Link to="/reservation" className="navbar-button" style={{ marginTop: "33px" }}>
                LOGIN
            </Link>
        </nav>
    );
};

export default Navbarr;
