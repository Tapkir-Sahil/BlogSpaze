import React, { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import API from "../services/authApi";
import "./Home.css"

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
          <BlogCard
            key={blog._id}
            author={blog.author?.name}
            title={blog.title}
            desc={blog.description}
            img={blog.image || "/blogspaze_logo.png"}
            views={blog.views || 0}
            likes={blog.likes || 0}
            comments={blog.comments?.length || 0}
          />
        ))
      )}
    </div>
  );
};

export default Home;
