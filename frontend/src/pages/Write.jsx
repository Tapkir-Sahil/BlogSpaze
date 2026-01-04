import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/authApi";
import "./Write.css";

const Write = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [content, setContent] = useState("");
  const [popup, setPopup] = useState(false);

  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await API.post("/blogs", {
      title,
      description: desc,
      content,
      image: "./blogspaze_logo.png",
    });

    setPopup(true);

    setTimeout(() => {
      setPopup(false);
      navigate("/home");
    }, 2000);

  } catch (err) {
    console.error(err);
    alert("Login required to write a blog");
    navigate("/login");
  }
};


  return (
    <div className="write-page">
      <form className="write-container" onSubmit={handleSubmit}>
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
          placeholder="Description"
          className="write-desc"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          required
        />

        <br />
        <textarea
          className="write-textarea"
          placeholder="Convey those emotions and thoughts..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        <div className="write-actions">
          <button type="submit" className="submit-btn">Submit</button>
          <button type="button" onClick={() => navigate("/")}>Cancel</button>
        </div>
      </form>

      {popup && <div className="popup">✅ Blog Posted</div>}
    </div>
  );
};

export default Write;
