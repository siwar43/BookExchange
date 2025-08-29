import './App.css';
import Register from './Components/Register';
import Login from './Components/Login';
import { Route, Routes } from 'react-router-dom';
import Profile from './Components/Profile';
import { useEffect } from 'react';
import { userCurrent } from './JS/UserSlice/UserSlice';
import { useDispatch } from 'react-redux';
import PrivateRoute from './Routes/PrivateRoute';
import Home from './Components/Home';
import About from './Components/About';
import Navbarr from './Components/Navbarr';
import { getbook } from './JS/bookSlice';
import BookInterface from './Components/BookInterface';


function App() {
  const isAuth = localStorage.getItem("token");
  const dispatch=useDispatch();
    useEffect(() => {
    dispatch(userCurrent());
    dispatch(getbook());
  });
  return (
    <div className="App">

      <Navbarr/>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/book" element={<BookInterface />} /> {/* Nouvelle route pour les livres */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute/>}>
            <Route path="/profil" element={<Profile />} />
          </Route>

      </Routes>
    </div>
  );
}

export default App;
