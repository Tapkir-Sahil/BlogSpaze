import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  return (
    <Link
      to={`/blog/${blog._id}`}
      className="text-decoration-none text-dark"
    >
      <div className="card mb-3 shadow-sm">
        <div className="row g-0">

          {/* Image */}
          <div className="col-md-4">
            <img
              src={blog.image || "/blogspaze_logo.png"}
              className="img-fluid rounded-start"
              alt="blog"
              style={{
                height: "120px",       // 🔥 fixed height
                width: "100%",
                objectFit: "cover",
              }}
            />
          </div>

          {/* Content */}
          <div className="col-md-8">
            <div className="card-body py-2 px-3"> {/* 🔥 less padding */}
              <h6 className="fw-bold mb-1">{blog.title}</h6>

              <p
                className="card-text text-muted small mb-1"
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,     // 🔥 2 lines only
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {blog.description}
              </p>

              <span className="text-muted small">
                ✍ {blog.authorId?.name}
              </span>
            </div>
          </div>

        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
