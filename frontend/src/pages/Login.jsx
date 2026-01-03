import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/authApi";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await loginUser(form);

      // Save token
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // Redirect
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="card shadow-lg p-4" style={{ maxWidth: "420px", width: "100%" }}>
        <div className="text-center mb-3">
          <h2 className="fw-bold">Blogspaze</h2>
          <p className="text-muted small">
            Inspire someone by your stories and writing
          </p>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              placeholder="abc@xyz.com"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-2">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="********"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="text-end mb-3">
            <small className="text-muted">Forgot Password?</small>
          </div>

          <button
            type="submit"
            className="btn btn-dark w-100"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="text-center mt-3 small">
          Don’t have an account?{" "}
          <Link to="/register" className="fw-semibold">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
