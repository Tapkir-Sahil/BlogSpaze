import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Write.css";

const Write = ({ addPost }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [content, setContent] = useState("");
  const [popup, setPopup] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // create new post object
    const newPost = {
      id: Date.now(),
      title,
      description: desc,
      content,
      author: "Sahil Tapkir",
      date: new Date().toLocaleDateString(),
      likes: 0,
      comments: 0,
      image: "./blogspaze_logo.png",
    };

    addPost(newPost); // update local posts (works even before JSON Server)

    // show popup
    setPopup(true);

    // redirect after 3 seconds
    setTimeout(() => {
      setPopup(false);
      navigate("/");
    }, 2000);
  };

  return (
    <div className="write-page">
      <form className="write-container" onSubmit={handleSubmit}>
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
            placeholder="Description"
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

        <div className="write-toolbar">
          <button type="button" className="icon-btn">
            <b>B</b>
          </button>
          <button type="button" className="icon-btn">
            <i>I</i>
          </button>
          <button type="button" className="icon-btn">
            <u>U</u>
          </button>
          <button type="button" className="icon-btn">“ ”</button>
          <button type="button" className="icon-btn">🖼️</button>
          <button type="button" className="icon-btn">🔗</button>
          <button type="button" className="icon-btn">🎙️</button>
        </div>

        <div className="write-actions">
          <button type="submit" className="submit-btn">Submit</button>
          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
        </div>
      </form>

      {popup && (
        <div className="popup">
          <p>✅ Blog Posted</p>
        </div>
      )}
    </div>
  );
};

export default Write;
