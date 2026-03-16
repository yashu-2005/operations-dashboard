import { FaGoogle, FaFacebook } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../api/axios"; // now this works
import "../styles/login.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) return alert("Enter email and password");

    try {
      // Call backend API
      const res = await API.post("/auth/login", { email, password });
      const user = res.data.user;

      // Save user info in localStorage
      localStorage.setItem("currentUser", JSON.stringify(user));

      // Navigate to dashboard
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Sign In</h2>
        <p className="subtitle">Access your account to continue</p>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="login-btn" onClick={handleLogin}>
          Login
        </button>

        <p className="or">OR</p>

        <div className="social-login">
          <button className="google-btn">
            <FaGoogle /> Continue with Google
          </button>

          <button className="facebook-btn">
            <FaFacebook /> Continue with Facebook
          </button>
        </div>

        <p className="register">
          Don’t have an account? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  );
}

export default Login;