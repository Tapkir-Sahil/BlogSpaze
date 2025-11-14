const PostCard = ({ post }) => {
  return (
    <div className="card border-0 border-bottom mb-3 pb-3">
      <div className="d-flex">
        {/* Left: Post Content */}
        <div className="flex-grow-1">
          <div className="d-flex justify-content-between">
            <h6 className="fw-bold">{post.title}</h6>
            <button className="btn btn-light border-0 p-0">
              <i className="bi bi-three-dots-vertical"></i>
            </button>
          </div>

          <p className="text-muted small mb-2">{post.description}</p>

          {/* Meta Info */}
          <div className="d-flex text-muted small gap-3">
            <span><i className="bi bi-eye me-1"></i>{post.views}</span>
            <span><i className="bi bi-hand-thumbs-up me-1"></i>{post.likes}</span>
            <span><i className="bi bi-chat me-1"></i>{post.comments}</span>
          </div>
        </div>

        {/* Right: Thumbnail */}
        <img
          src={post.image}
          alt="Post"
          className="ms-3"
          style={{ width: "160px", height: "100px", objectFit: "cover" }}
        />
      </div>
    </div>
  );
};

export default PostCard;