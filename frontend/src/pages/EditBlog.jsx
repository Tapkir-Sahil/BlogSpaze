import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch blog
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await API.get(`/api/blogs/${id}`);
        setTitle(res.data.title);
        setDescription(res.data.description);
        setContent(res.data.content);
        setPreview(res.data.image);
      } catch (err) {
        alert("Failed to load blog");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  // 🔹 Image preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // 🔹 Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("content", content);
      if (image) formData.append("image", image);

      await API.put(`/api/blogs/${id}`, formData);

      alert("Blog updated successfully");
      navigate(`/profile`);
    } catch (err) {
      alert("Failed to update blog");
    }
  };

  if (loading) return <p className="text-center mt-5">Loading blog...</p>;

  return (
    <div className="container mt-4" style={{ maxWidth: "800px" }}>
      <h3 className="fw-bold mb-4">Edit Blog</h3>

      <form onSubmit={handleSubmit}>
        {/* Image */}
        <div className="mb-3 text-center">
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="img-fluid rounded mb-2"
              style={{ maxHeight: "250px", objectFit: "cover" }}
            />
          )}
          <input
            type="file"
            className="form-control"
            onChange={handleImageChange}
          />
        </div>

        {/* Title */}
        <div className="mb-3">
          <label className="form-label fw-medium">Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Description */}
        <div className="mb-3">
          <label className="form-label fw-medium">Description</label>
          <textarea
            className="form-control"
            rows="2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Content */}
        <div className="mb-4">
          <label className="form-label fw-medium">Blog Content</label>
          <textarea
            className="form-control"
            rows="8"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        {/* Buttons */}
        <div className="d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-warning"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-success px-4">
            Update Blog
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBlog;
