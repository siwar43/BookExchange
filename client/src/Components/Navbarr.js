import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../JS/UserSlice/UserSlice';
import './Navbarr.css';
import { FaUser, FaShoppingCart, FaHeart, FaSignOutAlt } from 'react-icons/fa';

function Navbarr() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const navbarClass = location.pathname === "/" ? "navbar navbar-home" : "navbar navbar-white";
    const user = useSelector((state) => state.user?.user);

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
        setIsOpen(false);
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        if (isOpen) {
            const handleClickOutside = (event) => {
                if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                    setIsOpen(false);
                }
            };
            document.addEventListener("mousedown", handleClickOutside);
            return () => document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [isOpen]);

    return (
        <nav className={navbarClass}>
            <ul className="navbar-links" style={{ marginTop: "44px" }}>
                <li>
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/book">Library</Link>
                </li>
                <li>
                    <Link to="/contact">Contact</Link>
                </li>
                {!user && (
                    <li>
                        <Link to="/register">Register</Link>
                    </li>
                )}
            </ul>

            <div className="navbar-logo">
                <img
                    src="/Logo.png"
                    alt="ReadLoop Logo"
                    style={{ width: "150px", height: "75px" }}
                />
            </div>

            {!user ? (
                <Link
                    to="/login"
                    className={`navbar-button ${location.pathname === "/" ? "home-btn" : "other-btn"}`}
                    style={{ marginTop: "33px" }}
                    aria-label="Login"
                >
                    LOGIN
                </Link>
            ) : (
                <div className="user-dropdown" ref={dropdownRef} style={{ marginTop: "33px", position: 'relative' }}>
                    <div
                        className="user-icon"
                        onClick={toggleDropdown}
                        aria-haspopup="true"
                        aria-expanded={isOpen}
                    >
                        <img
                            src={user?.profileImage || "https://www.gstatic.com/images/branding/product/1x/avatar_square_blue_512dp.png"}
                            alt="Profile"
                            className="user-avatar-img"
                        />
                    </div>
                    {isOpen && (
                        <div className="dropdown-menu" style={{ display: 'block' }}>
                            <div className="dropdown-header">
                                <span>Hello {user?.username || 'Guest'}</span>
                                <span>{user?.email || 'No email'}</span>
                            </div>
                            <Link to="/profil" className="dropdown-item" onClick={() => setIsOpen(false)}>
                                <FaUser /> Profile
                            </Link>
                            <Link to="/order" className="dropdown-item" onClick={() => setIsOpen(false)}>
                                <FaShoppingCart /> My Cart
                            </Link>
                            <Link to="/wishlist" className="dropdown-item" onClick={() => setIsOpen(false)}>
                                <FaHeart /> Wishlist
                            </Link>
                            <button className="dropdown-item"  style={{marginLeft:"50px" , marginTop :"10px"}} onClick={handleLogout}>
                                <FaSignOutAlt /> Logout
                            </button>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
}

export default Navbarr;
