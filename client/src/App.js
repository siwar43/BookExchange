import './App.css';
import Register from './Components/Register';
import Login from './Components/Login';
import { Route, Routes, useLocation } from 'react-router-dom';
import Profile from './Components/Profile';
import { useEffect, useState } from 'react';
import { getuser, userCurrent } from './JS/UserSlice/UserSlice';
import { useDispatch } from 'react-redux';
import PrivateRoute from './Routes/PrivateRoute';
import Home from './Components/Home';
import About from './Components/About';
import Navbarr from './Components/Navbarr';
import { getbook } from './JS/bookSlice';
import BookInterface from './Components/BookInterface';
import BookDetails from './Components/BookDetails';
import { getorder } from './JS/UserSlice/OrderSlice';

function App() {
  const isAuth = localStorage.getItem("token");
  const dispatch = useDispatch();
  const location = useLocation();
  const [ping, setping] = useState(false);

  useEffect(() => {
    dispatch(userCurrent());
    dispatch(getbook());
    dispatch(getuser());
    dispatch(getorder());
  }, [ping]);

  // ✅ Scroll to top à chaque changement de route
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  // Pages sur lesquelles on ne veut pas afficher la navbar
  const hideNavbar = location.pathname === "/register" || location.pathname === "/login";

  return (
    <div className="App">
      {!hideNavbar && <Navbarr />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/book" element={<BookInterface />} /> 
        <Route path="/book/:id" element={<BookDetails ping={ping} setping={setping} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profil" element={<Profile />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
