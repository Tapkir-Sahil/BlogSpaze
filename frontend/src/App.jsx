// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import ProfilePage from "./pages/ProfilePage";
import EditProfile from "./pages/EditProfile";
import Write from "./pages/Write";
import BlogPage from "./pages/BlogPage";
import Footer from "./components/Footer";
import { useState, useEffect } from "react";
import Landing from "./pages/landing";

function App() {
  // load initial posts from localStorage
  const [posts, setPosts] = useState(() => {
    return JSON.parse(localStorage.getItem("blogs")) || [];
  });

  // keep localStorage in sync whenever posts change
  useEffect(() => {
    localStorage.setItem("blogs", JSON.stringify(posts));
  }, [posts]);

  // addPost receives a post object (avoid naming it newPost here)
  const addPost = (post) => {
    setPosts((prev) => [post, ...prev]);
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home posts={posts} />} />
        <Route path="/landing" element={<Landing/>} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/writeblog" element={<Write addPost={addPost} />} />
        <Route path="/blog/:id" element={<BlogPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
