import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";

const ProfileHeader = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/api/users/me");
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch user");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <p className="text-muted">Loading profile...</p>;
  }

  if (!user) {
    return <p className="text-danger">Failed to load profile</p>;
  }

  return (
    <div className="d-flex justify-content-between align-items-start">
      {/* Left Side */}
      <div className="d-flex align-items-center">
        {/* Profile Picture */}
        <img
          src={user.profileImage || "/blogspaze_logo.png"}
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
