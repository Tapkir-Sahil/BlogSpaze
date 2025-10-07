import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./BlogPage.css";

const BlogPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    // Fetch blogs from localStorage
    const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
    const found = blogs.find((b) => b.id === Number(id));
    setBlog(found);
  }, [id]);

  if (!blog) {
    return (
      <div className="blogpage-container">
        <p className="blog-not-found">Blog not found 😢</p>
      </div>
    );
  }

  return (
    <div className="blogpage-container">
      {/* Blog Header */}
      <div className="blog-header">
        <h1 className="blog-title">{blog.title}</h1>
        <p className="blog-desc">{blog.description}</p>
        <div className="blog-meta">
          <img
            src="/blogspaze_logo.png"
            alt="Author"
            className="author-img"
          />
          <div>
            <p className="author-name">{blog.author}</p>
            <p className="blog-date">🗓️ {blog.date}</p>
          </div>
        </div>
      </div>

      {/* Blog Image */}
      <div className="blog-image-container">
        <img src={blog.image} alt={blog.title} className="blog-main-image" />
      </div>

      {/* Blog Content */}
      <div className="blog-content">
        <p>{blog.content}</p>
      </div>

      {/* Action Buttons */}
      <div className="blog-actions">
        <button className="back-btn" onClick={() => navigate("/")}>
          ← Back to Home
        </button>
      </div>
    </div>
  );
};

export default BlogPage;
