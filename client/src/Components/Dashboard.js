import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getuser, deleteuser, edituser } from "../JS/UserSlice/UserSlice";
import { getbook, deletebook } from "../JS/bookSlice";
import { getorder } from "../JS/OrderSlice";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { FaHome, FaUsers, FaBook, FaBox, FaTrash, FaRegEdit, FaArrowLeft } from "react-icons/fa";
import { BiCoinStack } from "react-icons/bi";
import "./Dashboard.css";

// Bouton de retour réutilisable
const BackButton = ({ onClick }) => (
  <button className="back-btn" onClick={onClick}>
    <FaArrowLeft style={{ marginRight: "8px" }} />
  </button>
);

const Dashboard = ({ ping, setping }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userlist } = useSelector((state) => state.user);
  const { booklist } = useSelector((state) => state.book);
  const { orderlist } = useSelector((state) => state.order);

  const [activeTab, setActiveTab] = useState("home");

  // States pour la recherche
  const [userSearch, setUserSearch] = useState("");
  const [bookSearch, setBookSearch] = useState("");
  const [ordersSearch, setOrdersSearch] = useState("");

  useEffect(() => {
    dispatch(getuser());
    dispatch(getbook());
    dispatch(getorder());
  }, [dispatch, ping]);

  // Filtrage
  const filteredUsers = userlist?.filter(
    (u) =>
      u?.username.toLowerCase().includes(userSearch.toLowerCase()) ||
      u?.email.toLowerCase().includes(userSearch.toLowerCase()) ||
      u?.category.toLowerCase().includes(userSearch.toLowerCase())
  );

  const filteredBooks = booklist?.filter(
    (b) =>
      b?.title.toLowerCase().includes(bookSearch.toLowerCase()) ||
      b?.category.toLowerCase().includes(bookSearch.toLowerCase())
  );

  const filteredOrders = orderlist?.filter(
    (o) =>
      o?.booktitle.toLowerCase().includes(ordersSearch.toLowerCase()) ||
      (o?.price + " DT").toLowerCase().includes(ordersSearch.toLowerCase())
  );

  // Suppression et édition
  const handleDeleteBook = (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((res) => {
      if (res.isConfirmed) {
        dispatch(deletebook(id)).then(() => setping(!ping));
        Swal.fire("Deleted!", "Book has been deleted.", "success");
      }
    });
  };

  const handleDeleteUser = (id) => {
    Swal.fire({
      title: "Are you sure you want to delete this user?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete!",
      cancelButtonText: "Cancel",
      buttonsStyling: false
    }).then((res) => {
      if (res.isConfirmed) {
        Swal.fire("Deleted!", "The user has been deleted successfully.", "success");
      }
    });
  };

  const handleEditRole = (user) => {
    Swal.fire({
      title: "Edit User Role",
      input: "text",
      inputValue: user.category,
      showCancelButton: true,
      confirmButtonText: "Save",
      cancelButtonText: "Cancel",
      buttonsStyling: false
    }).then((res) => {
      if (res.isConfirmed && res.value.trim() !== "") {
        Swal.fire("Updated!", "The user role has been updated successfully.", "success");
      }
    });
  };

  const handleHomeClick = () => {
    setActiveTab("home");
    navigate("/");
  };

  return (
    <div className="admin-dashboard-container dash">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo-container">
          <img src="/Logo.png" alt="logo" className="logo-img" />
        </div>
        <div className="user-info">
          <img
            src="https://www.pngmart.com/files/21/Admin-Profile-PNG-Clipart.png"
            alt="user"
            className="user-img"
          />
          <h3>Admin</h3>
          <p>admin@gmail.com</p>
        </div>
        <nav>
          <ul>
            <li onClick={handleHomeClick} className={activeTab === "home" ? "active" : ""}>
              <FaHome className="icon" /> Home
            </li>
            <li onClick={() => setActiveTab("users")} className={activeTab === "users" ? "active" : ""}>
              <FaUsers className="icon" /> Users
            </li>
            <li onClick={() => setActiveTab("books")} className={activeTab === "books" ? "active" : ""}>
              <FaBook className="icon" /> Books
            </li>
            <li onClick={() => setActiveTab("orders")} className={activeTab === "orders" ? "active" : ""}>
              <FaBox className="icon" /> Orders
            </li>
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="main-content">
        {/* Home */}
        {activeTab === "home" && (
          <div className="dashboard-home">
            <div className="header">
              <h2>Welcome to the Dashboard !</h2>
            </div>
            <div className="stat-cards" style={{display:"flex" , justifyContent:"center"}}>
              <div className="stat-card earning">
                <span className="label"> <FaUsers className="icon" /> Users </span>
                <span className="value">{userlist?.length || 0}</span>
              </div>
              <div className="stat-card share">
                <span className="label"><FaBook className="icon" />Books </span>
                <span className="value">{booklist?.length || 0}</span>
              </div>
              <div className="stat-card likes">
                <span className="label"><FaBox className="icon" />Orders </span>
                <span className="value">{orderlist?.length || 0}</span>
              </div>
              <div className="stat-card rating">
                <span className="label"><BiCoinStack className="icon" /> Total </span>
                <span className="value">
                  {(orderlist || []).reduce((sum, o) => sum + (o.price || 0), 0).toFixed(2)} DT
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Users Table */}
        {activeTab === "users" && (
          <div className="table-section">
            <BackButton onClick={() => setActiveTab("home")} />
            <h2>The list of users :</h2>
            <div className="table-search-container">
              <input
                type="text"
                placeholder="Search users..."
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                className="table-search"
              />
            </div>
            <div className="table-scroll" style={{display:"flex" , justifyContent:"center"}}>
              <table>
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers?.map((u) => (
                    <tr key={u._id}>
                      <td>{u.email}</td>
                      <td>{u.username}</td>
                      <td>{u.category}</td>
                      <td>
                        <button className="edit-btn" onClick={() => handleEditRole(u)}>
                          <FaRegEdit />
                        </button>
                      </td>
                      <td>
                        <button className="delete-btn" onClick={() => handleDeleteUser(u._id)}>
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Books Table */}
        {activeTab === "books" && (
          <div className="table-section">
            <BackButton onClick={() => setActiveTab("home")} />
            <h2>The list of books :</h2>
            <div className="table-search-container">
              <input
                type="text"
                placeholder="Search books..."
                value={bookSearch}
                onChange={(e) => setBookSearch(e.target.value)}
                className="table-search"
              />
            </div>
            <div className="table-scroll" style={{display:"flex" , justifyContent:"center"}}>
              <table>
                <thead>
                  <tr>
                    <th>Cover</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBooks?.map((b) => (
                    <tr key={b._id}>
                      <td>
                        <img
                          src={b.image || "https://via.placeholder.com/60"}
                          alt={b.title}
                          className="table-img"
                        />
                      </td>
                      <td>{b?.title}</td>
                      <td>{b?.category}</td>
                      <td>{b?.price} DT</td>
                      <td>
                        <button className="delete-btn" onClick={() => handleDeleteBook(b._id)}>
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Orders Table */}
        {activeTab === "orders" && (
          <div className="table-section">
            <BackButton onClick={() => setActiveTab("home")} />
            <h2>The list of orders :</h2>
            <div className="table-search-container">
              <input
                type="text"
                placeholder="Search orders..."
                value={ordersSearch}
                onChange={(e) => setOrdersSearch(e.target.value)}
                className="table-search"
              />
            </div>
            <div className="table-scroll" style={{display:"flex" , justifyContent:"center"}}>
              <table>
                <thead>
                  <tr>
                    <th>Cover</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders?.map((o) => (
                    <tr key={o._id}>
                      <td>
                        <img
                          src={o.bookimage || "https://via.placeholder.com/60"}
                          alt={o.booktitle}
                          className="table-img"
                        />
                      </td>
                      <td>{o.booktitle}</td>
                      <td>{o.price} DT</td>
                      <td>Available</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Dashboard;
