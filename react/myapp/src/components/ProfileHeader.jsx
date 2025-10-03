import { Link } from "react-router-dom";

const ProfileHeader = () => {
  return (
    <div className="d-flex justify-content-between align-items-start">
      {/* Left Side: Profile Info */}
      <div className="d-flex align-items-center">
        {/* Profile Picture */}
        <img
          src="/profile-pic.jpg"
          alt="User"
          className="rounded-circle me-3"
          style={{ width: "80px", height: "80px", objectFit: "cover" }}
        />

        <div>
          {/* Name */}
          <h4 className="fw-bold mb-1">Tom Holland</h4>

          {/* Bio */}
          <p className="text-muted mb-1" style={{ fontStyle: "italic" }}>
            "With a Great Power Comes With Great Responsibility"
          </p>

          {/* Edit Profile */}
          <Link to="/editprofile" className="text-success fw-medium">
            <i className="bi bi-pencil me-1"></i>Edit profile
          </Link>
        </div>
      </div>

      {/* Right Side: 3-dot menu */}
      <button className="btn btn-light border-0">
        <i className="bi bi-three-dots-vertical"></i>
      </button>
    </div>
  );
};

export default ProfileHeader;
