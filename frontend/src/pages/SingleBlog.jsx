import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";

const SingleBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await API.get(`/api/blogs/${id}`);
        setBlog(res.data);
      } catch (err) {
        setError("Blog not found");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (error) return <p className="text-center text-danger mt-5">{error}</p>;

  return (
    <div className="container mt-4" style={{ maxWidth: "800px" }}>
      {/* Blog Image */}
      {blog.image && (
        <img
          src={blog.image}
          alt={blog.title}
          className="img-fluid rounded mb-4"
        />
      )}

      {/* Title */}
      <h2 className="fw-bold mb-2">{blog.title}</h2>

      {/* Author */}
      <p className="text-muted small">
        By <strong>{blog.authorId?.name}</strong> ·{" "}
        {new Date(blog.createdAt).toDateString()}
      </p>

      <hr />

      {/* Content */}
      <div
        className="mt-3"
        style={{ lineHeight: "1.8" }}
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </div>
  );
};

export default SingleBlog;
