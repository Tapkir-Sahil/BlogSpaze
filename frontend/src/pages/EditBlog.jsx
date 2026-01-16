import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/axios";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Fetch existing blog
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await API.get(`/api/blogs/${id}`);
        setFormData({
          title: res.data.title,
          description: res.data.description,
          image: res.data.image || "",
        });
      } catch (err) {
        setError("Failed to load blog");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await API.put(`/api/blogs/${id}`, formData);
      navigate("/profile"); // or /your-posts
    } catch (err) {
      alert("Failed to update blog");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="text-center text-muted">Loading blog...</p>;
  }

  if (error) {
    return <p className="text-center text-danger">{error}</p>;
  }

  return (
    <div className="container mt-4" style={{ maxWidth: "700px" }}>
      <h4 className="fw-bold mb-3">Edit Blog</h4>

      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        {/* Description */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Description</label>
          <textarea
            className="form-control"
            rows="6"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        {/* Image */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Image URL</label>
          <input
            type="text"
            className="form-control"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
        </div>

        {/* Preview */}
        {formData.image && (
          <img
            src={formData.image}
            alt="Preview"
            className="img-fluid rounded mb-3"
          />
        )}

        {/* Buttons */}
        <div className="d-flex gap-2">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={saving}
          >
            {saving ? "Updating..." : "Update Blog"}
          </button>

          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBlog;
