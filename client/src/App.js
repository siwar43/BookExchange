import './App.css';
import Register from './Components/Register';
import Login from './Components/Login';
import { Route, Routes, useLocation } from 'react-router-dom';
import Profile from './Components/Profile';
import { useEffect, useState } from 'react';
import { getuser, userCurrent } from './JS/UserSlice/UserSlice';
import { useDispatch, useSelector } from 'react-redux';
import PrivateRoute from './Routes/PrivateRoute';
import Home from './Components/Home';
import About from './Components/About';
import Navbarr from './Components/Navbarr';
import { getbook } from './JS/bookSlice';
import BookInterface from './Components/BookInterface';
import BookDetails from './Components/BookDetails';
import { getorder } from './JS/OrderSlice';
import OrderList from './Components/OrderList';
import MyBooksList from './Components/MyBooksList';
import Sales from './Components/Sales';
import Dashboard from './Components/Dashboard';
import Contact from './Components/Contact';


function App() {
  const isAuth = localStorage.getItem("token");
  const dispatch = useDispatch();
  const location = useLocation();
  const [ping, setping] = useState(false);
  const user = useSelector((state) => state.user?.user); 

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
      {!hideNavbar && <Navbarr ping={ping} setping={setping} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/book" element={<BookInterface />} /> 
        <Route path="/book/:id" element={<BookDetails ping={ping} setping={setping} />} />
        <Route path="/mybooks" element={<MyBooksList  />} />
        <Route path="/order" element={<OrderList ping={ping} setping={setping} />} />
        <Route path="/sales" element={<Sales ping={ping} setping={setping} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/dashboard" element={<Dashboard ping={ping} setping={setping} />} />
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profil" element={<Profile />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
