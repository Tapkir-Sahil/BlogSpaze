import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  return (
    <Link
      to={`/blog/${post._id || post.id}`}
      className="text-decoration-none text-dark"
    >
      <div className="card border-0 border-bottom mb-3 pb-3">
        <div className="d-flex">
          {/* Left: Post Content */}
          <div className="flex-grow-1">
            <div className="d-flex justify-content-between">
              <h6 className="fw-bold">{post.title}</h6>

              {/* Three dots (stop navigation when clicked) */}
              <button
                className="btn btn-light border-0 p-0"
                onClick={(e) => e.preventDefault()}
              >
                <i className="bi bi-three-dots-vertical"></i>
              </button>
            </div>

            <p className="text-muted small mb-2">
              {post.description}
            </p>

            {/* Meta Info */}
            <div className="d-flex text-muted small gap-3">
              <span>
                <i className="bi bi-eye me-1"></i>
                {post.views || 0}
              </span>
              <span>
                <i className="bi bi-hand-thumbs-up me-1"></i>
                {post.likes || 0}
              </span>
              <span>
                <i className="bi bi-chat me-1"></i>
                {post.comments || 0}
              </span>
            </div>
          </div>

          {/* Right: Thumbnail */}
          {post.image && (
            <img
              src={post.image}
              alt="Post"
              className="ms-3 rounded"
              style={{
                width: "160px",
                height: "100px",
                objectFit: "cover",
              }}
            />
          )}
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
