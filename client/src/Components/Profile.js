import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";
import { logout, edituser, userCurrent } from "../JS/UserSlice/UserSlice";
import "./Profile.css";
import { CiHeart, CiShoppingCart, CiUser } from "react-icons/ci";
import { IoKeyOutline } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";

function Profile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user?.user);

    const [editable, setEditable] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        phone: "",
        country: "",
        city: "",
        address: "",
        title: "",
        languages: "",
        age: "",
        description: "",
    });

    useEffect(() => {
        dispatch(userCurrent());
    }, [dispatch]);

    useEffect(() => {
        if (user) {
        setFormData({
            username: user.username || "",
            email: user.email || "",
            phone: user.phone || "",
            country: user.country || "",
            city: user.city || "",
            address: user.address || "",
            title: user.title || "",
            languages: user.languages || "",
            age: user.age || "",
            description: user.description || "",
        });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        try {
        await dispatch(edituser({ id: user._id, edited: formData })).unwrap();
        setEditable(false);
        dispatch(userCurrent());
        alert("Profile updated successfully!");
        } catch (error) {
        console.log(error);
        alert("Error updating profile");
        }
    };

    if (!user) return <p>Loading...</p>;

    return (
        <div className="profile-container">
        {/* Sidebar */}
        <aside className="sidebar">
            {/* Cadre 1 : Image + Nom + Title */}
            <div className="sidebar-card">
            <img
                src={user.profileImage || "https://cdn-icons-png.flaticon.com/512/219/219983.png"}
                alt="Profile"
                className="profile-image"
            />
            <h2 className="profile-name">{formData.username}</h2>
            <p className="profile-title">{formData.title}</p>
            </div>

            {/* Cadre 2 : Navigation */}
            <div className="sidebar-card nav-card">
            <div className="sidebar-nav">
                <NavLink to="/profil" className="nav-item" style={{ color: "#232323" , fontSize:"15px" , letterSpacing : "1px" }}>
                <CiUser /> Profile
                </NavLink>

                <NavLink to="/order" className="nav-item" style={{ color: "#232323" , fontSize:"15px" , letterSpacing : "1px" }}>
                <CiShoppingCart /> My Cart
                </NavLink>

                <NavLink to="/wishlist" className="nav-item" style={{ color: "#232323" , fontSize:"15px" , letterSpacing : "1px"  }}>
                <CiHeart /> Wishlist
                </NavLink>

                <NavLink to="/privacy-policy" className="nav-item" style={{ color: "#232323" , fontSize:"15px" , letterSpacing : "1px" }}>
                <IoKeyOutline /> Privacy Policy
                </NavLink>

                <button
                className="nav-item logout-btn"
                style={{ color: "#232323" , letterSpacing : "1px" }}
                onClick={() => {
                    dispatch(logout());
                    navigate("/");
                }}
                >
                <IoIosLogOut /> Log Out
                </button>
            </div>
            </div>
        </aside>

        {/* Main Content */}
        <main className="profile-content">
            {/* Basic Information */}
            <section className="info-section">
            <h2>Basic Information</h2>
            <div className="info-row">
                <div>
                <label>Your Name :</label>
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    readOnly={!editable}
                />
                </div>
                <div>
                <label>Profession :</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    readOnly={!editable}
                />
                </div>
            </div>
            <div className="info-row">
                <div>
                <label>Languages :</label>
                <input
                    type="text"
                    name="languages"
                    value={formData.languages}
                    onChange={handleChange}
                    readOnly={!editable}
                />
                </div>
                <div className="age-wrapper">
                <label>Age :</label>
                <div className="input-with-suffix">
                    <input
                    type="text"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    readOnly={!editable}
                    />
                    <span className="suffix">years</span>
                </div>
                </div>
            </div>
            <div className="info-row">
                <label>Description :</label>
                <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                readOnly={!editable}
                style={{ width: "720px" }}
                />
            </div>
            </section>

            {/* Contact Information */}
            <section className="info-section">
            <h2 style={{ marginTop: "60px" }}>Contact Information</h2>
            <div className="info-row">
                <div>
                <label>Contact Number :</label>
                <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    readOnly={!editable}
                />
                </div>
                <div>
                <label>Email Address :</label>
                <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    readOnly={!editable}
                />
                </div>
            </div>
            <div className="info-row">
                <div>
                <label>Country :</label>
                <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    readOnly={!editable}
                />
                </div>
            </div>
            <div className="info-row">
                <div>
                <label>City :</label>
                <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    readOnly={!editable}
                />
                </div>
                <div>
                <label>Full Address :</label>
                <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    readOnly={!editable}
                />
                </div>
            </div>
            </section>

            {/* Buttons */}
            <div className="profile-buttons">
            <button className="save-btn" onClick={() => setEditable(!editable)}>
                {editable ? "Cancel" : "Edit Profile"}
            </button>
            {editable && (
                <button className="save-btn" onClick={handleSave}>
                Save Changes
                </button>
            )}
            </div>
        </main>
        </div>
    );
}

export default Profile;
