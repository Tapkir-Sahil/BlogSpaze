import { useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

const PostCard = ({ post, onDelete }) => {
  const navigate = useNavigate();

  // 🔹 Open blog
  const openBlog = () => {
    navigate(`/blog/${post._id}`);
  };

  return (
    <div className="card border-0 border-bottom mb-3 pb-3">
      <div className="d-flex">

        {/* Left */}
        <div className="flex-grow-1">
          <div className="d-flex justify-content-between align-items-start">
            
            {/* Clickable title */}
            <h6
              className="fw-bold cursor-pointer"
              style={{ cursor: "pointer" }}
              onClick={openBlog}
            >
              {post.title}
            </h6>

            {/* Three dots */}
            <div
              className="dropdown"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="btn btn-light border-0 p-0"
                data-bs-toggle="dropdown"
              >
                <i className="bi bi-three-dots-vertical"></i>
              </button>

              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => navigate(`/edit-blog/${post._id}`)}
                  >
                    <i className="bi bi-pencil me-2"></i>Edit
                  </button>
                </li>

                <li>
                  <button
                    className="dropdown-item text-danger"
                    onClick={() => onDelete(post._id)}
                  >
                    <i className="bi bi-trash me-2"></i>Delete
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Clickable description */}
          <p
            className="text-muted small mb-2"
            style={{ cursor: "pointer" }}
            onClick={openBlog}
          >
            {post.description}
          </p>

          <div className="d-flex text-muted small gap-3">
            <span><i className="bi bi-eye me-1"></i>{post.views || 0}</span>
            <span><i className="bi bi-heart me-1"></i>{post.likes?.length || 0}</span>
            <span><i className="bi bi-chat me-1"></i>{post.comments?.length || 0}</span>
          </div>
        </div>

        {/* Right image (clickable) */}
        <img
          src={post.image || "/blogspaze_logo.png"}
          alt="Post"
          className="ms-3 rounded"
          style={{ width: "160px", height: "100px", objectFit: "cover", cursor: "pointer" }}
          onClick={openBlog}
        />
      </div>
    </div>
  );
};

export default PostCard;
