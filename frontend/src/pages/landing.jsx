import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Landing = () => {
  return (
    <div className="container py-5">
      <div className="row align-items-center min-vh-75">
        
        {/* LEFT IMAGE */}
        <div className="col-lg-6 order-2 order-lg-1 text-center mb-4 mb-lg-0">
          <img
            src="/typography-illustration.png" 
            alt="Blogspaze Illustration"
            className="img-fluid"
            style={{ maxHeight: "420px" }}
          />
        </div>

        {/* RIGHT CONTENT */}
        <div className="col-lg-6 order-1 order-lg-2 text-center text-lg-start">
          <h1 className="fw-bold display-5">
            Unveil Thoughts
            <br />
            <span className="text-dark">Voice Yours</span>
          </h1>

          <p className="text-muted mt-3 mb-4 fs-5">
            A place where ideas, stories, and voices come together.
            Write freely, share boldly, and inspire others with Blogspaze.
          </p>

          <Link to="/register" className="btn btn-dark btn-lg px-4">
            Get Started →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
