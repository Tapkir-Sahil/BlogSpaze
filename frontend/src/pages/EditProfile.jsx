import { useState } from "react";
import { Link } from "react-router-dom";

const EditProfile = () => {
  const [name, setName] = useState("Sahil Tapkir");
  const [bio, setBio] = useState(
    "Master Of My Own Destiny"
  );
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    alert("Profile updated successfully!");
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <h3 className="fw-bold mb-4">Edit Profile</h3>
      <form onSubmit={handleSubmit}>
        {/* Profile Image Upload */}
        <div className="mb-3 text-center">
          <img
            src="/blogspaze_logo.png"
            alt="Profile"
            className="rounded-circle mb-2"
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
          <div>
            <input type="file" className="form-control mt-2" />
          </div>
        </div>

        {/* Name */}
        <div className="mb-3">
          <label className="form-label fw-medium">Full Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
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

        {/* Password */}
        <div className="mb-3">
          <label className="form-label fw-medium">New Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter new password"
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-medium">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
          />
        </div>

        {/* Action Buttons */}
        <div className="d-flex justify-content-between mt-4">
            <Link to="/profile" className="btn btn-warning" style={{textDecoration : 'none'}}>
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
