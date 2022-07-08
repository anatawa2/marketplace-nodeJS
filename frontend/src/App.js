import { Routes, Route } from "react-router-dom";
import Home from './components/Home'
import Login from './components/Login'
import Profile from './components/Profile'
import Register from './components/Register'
import Search from './components/Search'



function App() {
  return ( 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="profile" element={<Profile />} />
        <Route path="search" element={<Search />} />
      </Routes> 
  );
}

export default App;
