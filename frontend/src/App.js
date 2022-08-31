import { Routes, Route, Navigate } from "react-router-dom";

import AppBar from './components/AppBar'
import Login from './features/Authentication/Login'
import Setting from './features/Authentication/Setting'
import Register from './features/Authentication/Register'

import Chat from './features/Chat/Chat'
import Page404 from './features/View/Page404'
import Profile from './features/View/Profile'
import Category from './features/View/Category'
import Marketplace from './features/View/Marketplace'

import InboxNotify from './features/View/Inbox'
import Inbox from "./features/Chat/Inbox";
import Notifications from './features/View/Notifications'

import Search from './features/Product/Search'
import Product from './features/Product/Product'
import UpProduct from './features/Product/UpProduct'
import DelProduct from './features/Product/DelProduct'
import AddProduct from './features/Product/AddProduct'


function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to='/marketplace' replace />} />
      <Route path="*" element={<Navigate to='/404' replace />} />

      <Route path="marketplace" element={<Marketplace />} />
      <Route path="login" element={<Login />} />
      <Route path="setting" element={<Setting />} />
      <Route path="register" element={<Register />} />


      {/* <Route path="search/" element={<Marketplace  />} /> */}
      <Route path="marketplace/query/" element={<Search />} />
      <Route path="marketplace/search/" element={<Marketplace auto={true} />} />
      <Route path="marketplace/category/:slug" element={<Category />} />
      <Route path="marketplace/product/:slug" element={<Product />} />
      <Route path="marketplace/product/add" element={<AddProduct />} />
      <Route path="marketplace/product/update/:slug" element={<UpProduct />} />
      <Route path="marketplace/product/delete/:slug" element={<DelProduct />} />

      <Route path="marketplace/profile/:slug" element={<Profile />} />
      <Route path="marketplace/notifications" element={<Notifications />} />

      <Route path="messenger" element={<InboxNotify />} />
      <Route path="messenger/inbox" element={<Inbox />} />
      <Route path="messenger/inbox/:id" element={<Chat />} />
      <Route path="404" element={<Page404 />} />
      <Route path="appbar" element={<AppBar />} />
      <Route path="temp" element={<Navigate to="/" />} />

    </Routes >
  );
}

export default App;
