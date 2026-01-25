import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios.js";
import "./Write.css";

const Write = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [popup, setPopup] = useState(false);

  const navigate = useNavigate();

  // IMAGE SELECT
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // SUBMIT BLOG
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", desc);
      formData.append("content", content);

      if (image) {
        formData.append("image", image);
      }

      await API.post("/blogs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setPopup(true);

      setTimeout(() => {
        setPopup(false);
        navigate("/home");
      }, 1200);

    } catch (err) {
      console.error(err);
      alert("Login required to write a blog");
      navigate("/login");
    }
  };

  return (
    <div className="write-page">
      <form className="write-container" onSubmit={handleSubmit}>

        {/* IMAGE UPLOAD */}
        <label className="image-upload-box">
          {preview ? (
            <img src={preview} alt="Preview" className="image-preview" />
          ) : (
            <div className="image-placeholder">
              <i className="bi bi-image me-2"></i>
              Upload cover image
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleImageChange}
          />
        </label>

        {/* INPUTS */}
        <div className="write-inputs">
          <input
            type="text"
            placeholder="Title"
            className="write-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Short description"
            className="write-desc"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            required
          />

          <textarea
            className="write-textarea"
            placeholder="Convey those emotions and thoughts..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        {/* ACTIONS */}
        <div className="write-actions">
          <button type="submit" className="submit-btn">
            Publish
          </button>
          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate("/home")}
          >
            Cancel
          </button>
        </div>
      </form>

      {popup && <div className="popup">✅ Blog Posted</div>}
    </div>
  );
};

export default Write;
