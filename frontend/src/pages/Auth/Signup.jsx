import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signupUser } from "../../services/authService";
import "./Signup.css";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "member",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signupUser(form);
      alert("Signup successful. Please login.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-hero">
        <div className="auth-hero-overlay" />
        <div className="auth-hero-content">
          <span className="auth-logo-circle">FQ</span>
          <h1>FitQuest</h1>
          <p>Onboard new admins, trainers and members with a seamless flow.</p>
          <ul>
            <li>Role‑based access for admins, trainers & members</li>
            <li>Secure authentication with JWT</li>
            <li>Designed for serious fitness businesses</li>
          </ul>
        </div>
      </div>

      <div className="auth-panel">
        <div className="auth-card">
          <div className="auth-card-header">
            <h2>Create your account</h2>
            <p>Start managing your gym with a few simple details.</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <label className="auth-field">
              <span>Full name</span>
              <input
                name="name"
                placeholder="John Carter"
                onChange={handleChange}
                required
              />
            </label>

            <label className="auth-field">
              <span>Email</span>
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                onChange={handleChange}
                required
              />
            </label>

            <label className="auth-field">
              <span>Password</span>
              <input
                name="password"
                type="password"
                placeholder="Create a strong password"
                onChange={handleChange}
                required
              />
            </label>

            <label className="auth-field">
              <span>Role</span>
              <select name="role" onChange={handleChange} value={form.role}>
                <option value="member">Member</option>
                <option value="trainer">Trainer</option>
              </select>
            </label>

            <button className="auth-primary-btn" type="submit" disabled={loading}>
              {loading ? "Creating account..." : "Signup"}
            </button>

            <p className="auth-footer-text">
              Already have an account?{" "}
              <Link to="/login" className="auth-link">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
