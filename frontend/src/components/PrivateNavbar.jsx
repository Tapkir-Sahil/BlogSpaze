import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const PrivateNavbar = () => {
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const { user, logout } = useAuth();   // ✅ get user here
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // ✅ simple utility function (NO hooks here)
  const maskEmail = (email) => {
    if (!email) return "";
    const [name, domain] = email.split("@");
    return name.slice(0, 2) + "********@" + domain;
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom px-3">
      {/* Brand */}
      <Link className="navbar-brand d-flex align-items-center" to="/home">
        <img
          src="/blogspaze-high-resolution-logo-grayscale-transparent.png"
          alt="Blogspaze Logo"
          style={{ height: "35px" }}
        />
      </Link>

      <div className="d-flex align-items-center ms-auto gap-3">
        <a className="nav-link text-dark" href="#features">
          Features
        </a>
        <a className="nav-link text-dark" href="#contact">
          Contact team
        </a>
        {/* Write */}
        <Link to="/writeblog" className="btn btn-outline-dark">
          <i className="bi bi-pencil"></i>
        </Link>

        {/* Profile Dropdown */}
        <div className="dropdown">
          <button
            className="btn border-0 p-0 dropdown-toggle"
            data-bs-toggle="dropdown"
          >
            <img
              src={user.profilePic || "/blogspaze_logo.png"}
              alt="Profile"
              className="rounded-circle"
              style={{ width: "40px", height: "40px" }}
            />
          </button>

          <ul className="dropdown-menu dropdown-menu-end shadow">
            <li>
              <Link className="dropdown-item" to="/profile">
                <i className="bi bi-journal-text me-2"></i> Your Posts
              </Link>
            </li>

            <li>
              <Link className="dropdown-item" to="/editprofile">
                <i className="bi bi-person me-2"></i> Profile
              </Link>
            </li>

            <li><hr className="dropdown-divider" /></li>

            <li>
              <button
                className="dropdown-item text-danger"
                onClick={handleLogout}
              >
                <i className="bi bi-box-arrow-right me-2"></i> Sign out
              </button>
            </li>

            <li className="dropdown-item text-muted small">
              {maskEmail(user?.email)}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default PrivateNavbar;
