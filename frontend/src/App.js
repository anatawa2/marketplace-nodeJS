import { Routes, Route } from "react-router-dom"; 
import Login from './components/Login'
import Profile from './components/Profile'
import Register from './components/Register'
import Search from './components/Search'
import Store from './components/Store'
import About from './components/About'
import Product from './components/Product'

import AppBar from './components/AppBar'
import { Navigate } from "react-router-dom";


function App() {
  return ( 
      <Routes>
        <Route path="/" element={<Store />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="profile" element={<Profile />} />

        <Route path="search" element={<Search />} />
        <Route path="store" element={<Store />} />
        <Route path="about" element={<About />} />
        <Route path="product/:slug" element={<Product />} />

        <Route path="appbar" element={<AppBar />} />
        <Route path="temp" element={<Navigate to="/"/>} />

      </Routes> 
  );
}

export default App;
