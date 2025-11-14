import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = ({ posts = [] }) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/blogs")
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch((err) => console.log("Error loading blogs:", err));
  }, []);



  return (
    <div className="home-container">
      <h1 className="home-title">📚 Latest Blogs</h1>

      {blogs.length === 0 ? (
        <p className="no-blogs">No blogs yet. Click “Write” to post one!</p>
      ) : (
        <div className="blogs-grid">
          {blogs.map((blog) => (
            <div className="blog-card" key={blog.id}>
              <h2 className="blog-title">{blog.title}</h2>
              <p className="blog-desc">
                {blog.description.length > 120
                  ? blog.description.substring(0, 120) + "..."
                  : blog.description}
              </p>

              <div className="blog-footer">
                <span className="blog-date">🗓️ {blog.date}</span>
                <Link to={`/blog/${blog.id}`} className="read-more">
                  Read More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
