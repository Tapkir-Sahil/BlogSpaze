import React, { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import API from "../api/axios.js";
import "./Home.css";

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await API.get("/blogs");
        setBlogs(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="container py-4">
      <h2 className="mb-4">📚 Latest Blogs</h2>

      {blogs.length === 0 ? (
        <p>No blogs yet.</p>
      ) : (
        blogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))
      )}
    </div>
  );
};

export default Home;
