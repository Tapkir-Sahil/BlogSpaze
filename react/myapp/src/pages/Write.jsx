import "bootstrap-icons/font/bootstrap-icons.css";
import "../App.css";

const Write = () => {
  return (
    <div className="container mt-4" style={{ maxWidth: "800px" }}>
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <p className="text-muted mb-0">Added in Draft</p>
        <div className="d-flex align-items-center text-muted">
          <i className="bi bi-lock me-1"></i>
          <span>Follower Only</span>
        </div>
      </div>

      {/* Title Input */}
      <input
        type="text"
        className="form-control border-0 fs-2 fw-bold mb-2"
        placeholder="Title"
        style={{ boxShadow: "none" }}
      />

      {/* Description Input */}
      <input
        type="text"
        className="form-control border-0 fs-5 text-secondary mb-3"
        placeholder="Description"
        style={{ boxShadow: "none" }}
      />

      {/* Blog Textarea */}
      <textarea
        className="form-control border-0 fs-5 text-secondary mb-5"
        placeholder="Convey those emotions and thoughts."
        rows="10"
        style={{ resize: "none", boxShadow: "none" }}
      ></textarea>

      {/* Toolbar */}
      <div
        className="d-flex justify-content-between align-items-center border rounded-pill py-2 px-3 bg-white shadow-sm"
        style={{ position: "sticky", bottom: "20px" }}
      >
        <div className="d-flex gap-3 fs-5 text-muted">
          <i className="bi bi-type-bold"></i>
          <i className="bi bi-type-italic"></i>
          <i className="bi bi-type-underline"></i>
          <i className="bi bi-quote"></i>
          <i className="bi bi-card-image"></i>
          <i className="bi bi-link-45deg"></i>
          <i className="bi bi-code-slash"></i>
          <i className="bi bi-mic"></i>
        </div>
        <i className="bi bi-plus-lg fs-5 text-muted"></i>
      </div>
    </div>
  );
};

export default Write;
