import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProfileHeader = () => {
  const { user } = useAuth();

  if (!user) {
    return <p className="text-muted">Loading profile...</p>;
  }

  return (
    <div className="d-flex justify-content-between align-items-start">
      {/* Left Side */}
      <div className="d-flex align-items-center">
        {/* Profile Picture */}
        <img
          src={user.profilePic || "/blogspaze_logo.png"}
          alt="User"
          className="rounded-circle me-3"
          style={{ width: "80px", height: "80px", objectFit: "cover" }}
        />

        <div>
          {/* Name */}
          <h4 className="fw-bold mb-1">{user.name}</h4>

          {/* Bio */}
          <p className="text-muted mb-1" style={{ fontStyle: "italic" }}>
            {user.bio || "No bio added yet"}
          </p>

          {/* Edit Profile */}
          <Link to="/editprofile" className="text-success fw-medium">
            <i className="bi bi-pencil me-1"></i>Edit profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
