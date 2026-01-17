import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";

const EditProfile = () => {
  const navigate = useNavigate();

  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch logged-in user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/api/users/me");
        setUserId(res.data._id);
        setName(res.data.name || "");
        setBio(res.data.bio || "");
      } catch (err) {
        console.error(err);
        alert("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("bio", bio);
      if (avatar) formData.append("avatar", avatar);

      await API.put(`/api/users/${userId}`, formData);

      alert("Profile updated successfully");
      navigate("/profile");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    }
  };

  if (loading) {
    return <p className="text-center mt-5">Loading profile...</p>;
  }

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <h3 className="fw-bold mb-4">Edit Profile</h3>

      <form onSubmit={handleSubmit}>
        {/* Avatar */}
        <div className="mb-3 text-center">
          <img
            src="/blogspaze_logo.png"
            alt="Profile"
            className="rounded-circle mb-2"
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
          <input
            type="file"
            className="form-control mt-2"
            onChange={(e) => setAvatar(e.target.files[0])}
          />
        </div>

        {/* Name */}
        <div className="mb-3">
          <label className="form-label fw-medium">Full Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Bio */}
        <div className="mb-3">
          <label className="form-label fw-medium">Bio</label>
          <textarea
            className="form-control"
            rows="3"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          ></textarea>
        </div>

        {/* Buttons */}
        <div className="d-flex justify-content-between mt-4">
          <Link to="/profile" className="btn btn-warning">
            Cancel
          </Link>
          <button type="submit" className="btn btn-success px-4">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
