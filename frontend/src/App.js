import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import AppBar from './components/AppBar'

import Login from './pages/Authentication/Login'
import Register from './pages/Authentication/Register'
import Setting from './pages/Authentication/Setting'

import Store from './pages/Store'
import Profile from './pages/Profile'

import Product from './pages/Product/Product'
import AddProduct  from './pages/Product/AddProduct'
import UpProduct from './pages/Product/UpProduct'
import DelProduct from './pages/Product/DelProduct'


function App() {
  return (
    <Routes>
      <Route path="/" element={<Store />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="setting" element={<Setting />} />

      <Route path="store" element={<Store />} />
      <Route path="product/add" element={<AddProduct />} />
      <Route path="product/:slug" element={<Product />} />
      <Route path="product/delete/:slug" element={<DelProduct />} />
      <Route path="product/update/" element={<UpProduct />} />
      {/* <Route path="product/update/:slug" element={<UpdateProduct />} /> */}

      <Route path="profile/:slug" element={<Profile />} />

      <Route path="appbar" element={<AppBar />} />
      <Route path="temp" element={<Navigate to="/" />} />

    </Routes>
  );
}

export default App;
