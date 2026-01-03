import { Link } from "react-router-dom";


const PublicNavbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-white border-bottom px-3">
      <Link className="navbar-brand fw-bold" to="/">
        Blogspaze
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