// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import ProfilePage from "./pages/ProfilePage";
import EditProfile from "./pages/EditProfile";
import Write from "./pages/Write";
import BlogPage from "./pages/BlogPage";
import Footer from "./components/Footer";
import Landing from "./pages/landing";
import PublicNavbar from "./components/PublicNavbar";
import PrivateNabar from "./components/PrivateNavbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useAuth } from "./context/AuthContext";

function App() {
  const {isAuth} = useAuth();
  return (
    <Router>
      {/* Navbar Switch */}
      {isAuth ? <PrivateNabar/> : <PublicNavbar/>}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />

        {/* Private Routes */}
        <Route path="/home" element={<Home/>} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/writeblog" element={<Write/>} />
        <Route path="/blog/:id" element={<BlogPage/>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
