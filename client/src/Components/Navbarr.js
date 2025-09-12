import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../JS/UserSlice/UserSlice';
import './Navbarr.css';
import AddBookModal from './AddBookModal';
import { FaUser, FaShoppingCart, FaHeart, FaSignOutAlt } from 'react-icons/fa';
import { IoMdAdd } from "react-icons/io";
import { PiBookOpenText } from "react-icons/pi";

function Navbarr({ ping, setping }) {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user?.user);

    // --- Hooks toujours en haut ---
    const [isUserOpen, setIsUserOpen] = useState(false);
    const [isMyBooksOpen, setIsMyBooksOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const userRef = useRef(null);
    const myBooksRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
        if (userRef.current && !userRef.current.contains(event.target)) {
            setIsUserOpen(false);
        }
        if (myBooksRef.current && !myBooksRef.current.contains(event.target)) {
            setIsMyBooksOpen(false);
        }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // --- Fonction logout ---
    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
        setIsUserOpen(false);
    };

    // --- Si on est sur dashboard, on n'affiche pas la navbar ---
    if (location.pathname === "/dashboard") return null;

    const navbarClass = location.pathname === '/' ? 'navbar navbar-home' : 'navbar navbar-white';

    return (
        <>
        <nav className={navbarClass}>
            <ul className="navbar-links" style={{ marginTop: '44px' }}>
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/about">About</Link>
            </li>
            <li>
                <Link to="/book">Library</Link>
            </li>

            {user && (
                <>
                {/* My Books Dropdown */}
                <li className="navbar-links-item my-books" ref={myBooksRef}>
                    <span
                    className="navbar-link"
                    onClick={() => setIsMyBooksOpen(!isMyBooksOpen)}
                    style={{ cursor: 'pointer' }}
                    >
                    My Books
                    </span>
                    {isMyBooksOpen && (
                    <ul className="book-dropdown-menu">
                        <li>
                        <span onClick={() => setIsModalOpen(true)} className="dropdown-link">
                            <IoMdAdd /> Add a Book
                        </span>
                        </li>
                        <li>
                        <Link to="/mybooks" className="dropdown-link">
                            <PiBookOpenText /> My Books List
                        </Link>
                        </li>
                    </ul>
                    )}
                </li>

                {/* Sales */}
                <li>
                    <Link to="/sales">Sales</Link>
                </li>
                </>
            )}

            <li>
                <Link to="/contact">Contact</Link>
            </li>

            {!user && (
                <li>
                <Link to="/register">Register</Link>
                </li>
            )}

            {user?.category === "admin" && (
                <li>
                <Link to="/dashboard">Dashboard</Link>
                </li>
            )}
            </ul>

            <div className="navbar-logo">
            <img
                src="/Logo.png"
                alt="ReadLoop Logo"
                style={{ width: '150px', height: '75px' }}
            />
            </div>

            {!user ? (
            <Link
                to="/login"
                className={`navbar-button ${location.pathname === '/' ? 'home-btn' : 'other-btn'}`}
                style={{ marginTop: '33px' }}
                aria-label="Login"
            >
                LOGIN
            </Link>
            ) : (
            <div className="user-dropdown" ref={userRef} style={{ marginTop: '33px', position: 'relative' }}>
                <div
                className="user-icon"
                onClick={() => setIsUserOpen(!isUserOpen)}
                aria-haspopup="true"
                aria-expanded={isUserOpen}
                >
                <img
                    src={user?.profileImage || 'https://www.gstatic.com/images/branding/product/1x/avatar_square_blue_512dp.png'}
                    alt="Profile"
                    className="user-avatar-img"
                />
                </div>
                {isUserOpen && (
                <div className="dropdown-menu" style={{ display: 'block' }}>
                    <div className="dropdown-header">
                    <span>Hello {user?.username || 'Guest'}</span>
                    <span>{user?.email || 'No email'}</span>
                    </div>
                    <Link to="/profil" className="dropdown-item" onClick={() => setIsUserOpen(false)}>
                    <FaUser /> Profile
                    </Link>
                    <Link to="/order" className="dropdown-item" onClick={() => setIsUserOpen(false)}>
                    <FaShoppingCart /> My Cart
                    </Link>
                    <Link to="/wishlist" className="dropdown-item" onClick={() => setIsUserOpen(false)}>
                    <FaHeart /> Wishlist
                    </Link>
                    <button
                    className="dropdown-item"
                    style={{ marginLeft: '50px', marginTop: '10px' }}
                    onClick={handleLogout}
                    >
                    <FaSignOutAlt /> Logout
                    </button>
                </div>
                )}
            </div>
            )}
        </nav>

        <AddBookModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} ping={ping} setping={setping} />
        </>
    );
}

export default Navbarr;
