import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userlogin } from '../JS/UserSlice/UserSlice';
import './Login.css';

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [login, setLogin] = useState({ email: "", password: "" });
    const [error, setError] = useState(""); // état pour message d'erreur

    const handleLogin = async () => {
        setError(""); // reset error
        if (!login.email || !login.password) {
            setError("Please fill in all fields");
            return;
        }

        try {
            const result = await dispatch(userlogin(login));

            if (result.payload && result.payload.success) {
                navigate("/profil");
            } else {
                setError("Check your credentials");
            }
        } catch (err) {
            console.error(err);
            setError("Check your credentials");
        }
    };

    return (
        <div className="wrapper">
            <div className="logo-container">
                <img src="/Logo.png" alt="Logo" className="logo" />
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="form-signin">
                <h2 className="form-heading">Login</h2>

                {error && <p className="error-message">{error}</p>}

                <div className="form-group">
                    <input
                        type="email"
                        name="email"
                        placeholder=" "
                        onChange={(e) => setLogin({ ...login, email: e.target.value })}
                        value={login.email}
                    />
                    <label>Email address</label>
                </div>

                <div className="form-group">
                    <input
                        type="password"
                        name="password"
                        placeholder=" "
                        onChange={(e) => setLogin({ ...login, password: e.target.value })}
                        value={login.password}
                    />
                    <label>Password</label>
                </div>

                <div className="checkbox-container">
                    <input type="checkbox" id="rememberMe" name="rememberMe" />
                    <label htmlFor="rememberMe">Remember me</label>
                </div>

                <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={()=>{ dispatch(userlogin(login));navigate("/")}}
                >
                    Login
                </button>

                <div className="login-link">
                    <h5>
                        You don't have an account? <Link to="/register">Register now</Link>
                    </h5>
                </div>
            </form>
        </div>
    );
}

export default Login;
