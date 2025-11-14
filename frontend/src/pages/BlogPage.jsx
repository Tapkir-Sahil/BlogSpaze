import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./BlogPage.css";

const BlogPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/blogs/${id}`)
      .then((res) => res.json())
      .then((data) => setBlog(data))
      .catch((err) => console.log("Error fetching blog:", err));
  }, [id]);

  if (!blog) {
    return <p className="blog-not-found">Blog not found 😢</p>;
  }

  return (
    <div className="blogpage-container">
      <div className="blog-header">
        <h1 className="blog-title">{blog.title}</h1>
        <p className="blog-desc">{blog.description}</p>
        <div className="blog-meta">
          <img src="/blogspaze_logo.png" alt="Author" className="author-img" />
          <div>
            <p className="author-name">{blog.author}</p>
            <p className="blog-date">🗓️ {blog.date}</p>
          </div>
        </div>
      </div>

      <div className="blog-image-container">
        <img src={blog.image} alt={blog.title} className="blog-main-image" />
      </div>

      <div className="blog-content">
        <p>{blog.content}</p>
      </div>

      <div className="blog-actions">
        <button className="back-btn" onClick={() => navigate("/")}>
          ← Back to Home
        </button>
      </div>
    </div>
  );
};

export default BlogPage;
