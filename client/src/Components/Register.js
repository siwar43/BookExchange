import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userRegister } from "../JS/UserSlice/UserSlice";

function Register() {
    const [register, setRegister] = useState({
        username: "",
        email: "",
        password: "",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png",
        address: "",
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const validate = () => {
        const newErrors = {};

        // Username
        if (!register.username) {
            newErrors.username = "Please enter your username.";
        }

        // Email
        if (!register.email) {
        newErrors.email = "Please enter your email.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(register.email)) {
        newErrors.email = "Please enter a valid email address.";
        }

        // Password
        if (!register.password) {
        newErrors.password = "Please enter your password.";
        } else if (register.password.length < 8) {
        newErrors.password = "Password must be at least 8 characters.";
        }

        // Address
        if (!register.address) {
            newErrors.address = "Please enter your address.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleRegister = () => {
        if (validate()) {
        dispatch(userRegister(register));
        navigate("/profil");
        }
    };

    return (
        <div>
        <div className="wrapper">
            <form onSubmit={(e) => e.preventDefault()} className="form-signin">
            <h2 className="form-signin-heading">Please Register</h2>

            <input
                type="text"
                className="form-control"
                placeholder="Username"
                value={register.username}
                onChange={(e) =>
                setRegister({ ...register, username: e.target.value })
                }
            />
            {errors.username && (
                <span style={{ color: "red" }}>{errors.username}</span>
            )}

            <input
                type="text"
                className="form-control"
                placeholder="Email Address"
                value={register.email}
                onChange={(e) =>
                setRegister({ ...register, email: e.target.value })
                }
            />
            {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}

            <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={register.password}
                onChange={(e) =>
                setRegister({ ...register, password: e.target.value })
                }
            />
            {errors.password && (
                <span style={{ color: "red" }}>{errors.password}</span>
            )}

            <input
                type="text"
                className="form-control"
                placeholder="Address"
                value={register.address}
                onChange={(e) =>
                setRegister({ ...register, address: e.target.value })
                }
            />
            {errors.address && (
                <span style={{ color: "red" }}>{errors.address}</span>
            )}

            <button
                className="btn btn-lg btn-primary btn-block"
                onClick={handleRegister}
            >
                Register
            </button>

            <h5 style={{ marginTop: "30px" }}>
                You already have an account? <Link to="/login">Sign in</Link>
            </h5>
            </form>
        </div>
        </div>
    );
}

export default Register;
