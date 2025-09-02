import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userRegister } from "../JS/UserSlice/UserSlice";
import './Register.css';

function Register() {
    const [register, setRegister] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Validation
    const validate = () => {
        const newErrors = {};
        if (!register.username) newErrors.username = "Enter your name.";
        if (!register.email) newErrors.email = "Enter your email.";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(register.email)) newErrors.email = "Invalid email.";
        if (!register.password) newErrors.password = "Enter password.";
        else if (register.password.length < 8) newErrors.password = "Password must be 8+ chars.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Submit
    const handleRegister = (e) => {
        e.preventDefault();
        if (validate()) {
        dispatch(userRegister(register));
        navigate("/profil");
        }
    };

    return (
        <div className="wrapper">
        <div className="logo-container">
            <img src="/Logo.png" alt="Logo" className="logo" />
        </div>

        <h2 className="form-heading">Create an account</h2>

        <form onSubmit={handleRegister} className="form-signin">

            {/* Username */}
            <div className="form-group">
            <input
                type="text"
                value={register.username}
                onChange={(e) => setRegister({ ...register, username: e.target.value })}
            />
            <label>Your Name</label>
            {errors.username && <span className="error">{errors.username}</span>}
            </div>

            {/* Email */}
            <div className="form-group">
            <input
                type="email"
                value={register.email}
                onChange={(e) => setRegister({ ...register, email: e.target.value })}
            />
            <label>Email</label>
            {errors.email && <span className="error">{errors.email}</span>}
            </div>

            {/* Password */}
            <div className="form-group">
            <input
                type="password"
                value={register.password}
                onChange={(e) => setRegister({ ...register, password: e.target.value })}
            />
            <label>Password</label>
            {errors.password && <span className="error">{errors.password}</span>}
            </div>

            {/* Submit */}
            <button type="submit" className="btn btn-primary">
            Sign Up
            </button>

            <h5 className="login-link">
            Already have an account? <Link to="/login">Sign in</Link>
            </h5>
        </form>
        </div>
    );
}

export default Register;
