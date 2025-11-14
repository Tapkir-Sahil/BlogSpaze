import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

const BlogCard = ({ author, title, desc, img, views, likes, comments }) => {
  return (
    <div className="border-bottom py-3">
      <div className="row align-items-center">
        {/* Left side: text */}
        <div className="col-12 col-md-8">
          <div className="d-flex align-items-center mb-2">
            <img
              src="/blogspaze_logo.png"
              alt="Author"
              className="rounded-circle me-2"
              style={{ width: "30px", height: "30px" }}
            />
            <small className="text-muted">{author}</small>
          </div>
          <h5 className="fw-bold">{title}</h5>
          <p className="text-muted">{desc}</p>
          <div className="d-flex gap-3 text-muted small">
            <span><i className="bi bi-eye"></i> {views}</span>
            <span><i className="bi bi-heart"></i> {likes}</span>
            <span><i className="bi bi-chat"></i> {comments}</span>
          </div>
          <div className="d-flex gap-3 mt-2">
            <i className="bi bi-hand-thumbs-up"></i>
            <i className="bi bi-chat"></i>
          </div>
        </div>

        {/* Right side: image */}
        <div className="col-12 col-md-4 text-md-end mt-3 mt-md-0">
          <img
            src={img}
            alt="Blog"
            className="img-fluid rounded"
            style={{ maxHeight: "120px", objectFit: "cover" }}
          />
        </div>
      </div>
    </div>
  );
};

export default BlogCard;