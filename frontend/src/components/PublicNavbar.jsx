import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";


const PublicNavbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom px-3">
      {/* Brand */}
      <Link className="navbar-brand d-flex align-items-center" to="/">
        <img
          src="/blogspaze-high-resolution-logo-grayscale-transparent.png"
          alt="Blogspaze Logo"
          style={{ height: "35px" }}
        />
      </Link>

      <div className="ms-auto d-flex gap-3 align-items-center">
        <a className="nav-link text-dark" href="#features">
          Features
        </a>
        <a className="nav-link text-dark" href="#contact">
          Contact team
        </a>
        <Link to="/login" className="btn btn-outline-dark">
          Sign in
        </Link>
      </div>

    </nav>
  )
};

export default PublicNavbar;