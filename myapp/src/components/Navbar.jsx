import { useState } from "react";
import {Link} from 'react-router-dom';
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom px-3">
      {/* Brand Logo */}
      <Link className="navbar-brand d-flex align-items-center flex-shrink-0" to="/">
        <img
          src="/blogspaze-high-resolution-logo-grayscale-transparent.png"
          alt="Blogspaze Logo"
          className="me-2"
          style={{ height: "35px", maxHeight: "8vw" }}
        />
      </Link>

      {/* Right Side */}
      <div className="d-flex align-items-center ms-auto gap-2 flex-shrink-0 flex-nowrap">
        {/* Desktop Search */}
        <form className="d-none d-md-flex mb-0">
          <input
            type="text"
            className="form-control"
            placeholder='Search "Blogspaze"'
            style={{ width: "200px" }}
          />
        </form>

        {/* Mobile Search */}
        <div className="d-flex align-items-center d-md-none">
          {!showMobileSearch ? (
            <button
              className="btn btn-outline-dark"
              onClick={() => setShowMobileSearch(true)}
            >
              <i className="bi bi-search"></i>
            </button>
          ) : (
            <div className="d-flex align-items-center flex-nowrap">
              <input
                type="text"
                className="form-control me-2"
                placeholder="Search..."
                style={{ width: "130px" }}
              />
              <button
                className="btn btn-outline-dark"
                onClick={() => setShowMobileSearch(false)}
              >
                <i className="bi bi-x"></i>
              </button>
            </div>
          )}
        </div>

        {/* Pencil Icon */}
        <Link to="/writeblog" className="btn btn-outline-dark me-1">
          <i className="bi bi-pencil"></i>
        </Link>

        {/* Profile Dropdown */}
        <div className="dropdown">
          <button
            className="btn border-0 p-0 dropdown-toggle"
            type="button"
            id="profileDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src="/blogspaze_logo.png"
              alt="Profile"
              className="rounded-circle"
              style={{ width: "40px", height: "40px" }}
            />
          </button>
          <ul className="dropdown-menu dropdown-menu-end shadow" aria-labelledby="profileDropdown">
            <li>
              <Link className="dropdown-item d-flex align-items-center" to="/profile"> 
                <i className="bi bi-person me-2"></i> Profile
              </Link>
            </li>
            <li>
              <Link className="dropdown-item d-flex align-items-center" to="/profile"> 
                <i className="bi bi-person me-2"></i> Your Post
              </Link>
            </li>
            <li><hr className="dropdown-divider" /></li>
            <li>
              <a className="dropdown-item text-danger d-flex align-items-center" href="#">
                <i className="bi bi-box-arrow-right me-2"></i> Sign out
              </a>
            </li>
            <li className="dropdown-item text-muted small">
              sa*********@gmail.com
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
