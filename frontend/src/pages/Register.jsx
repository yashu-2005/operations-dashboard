import { useState } from "react";
import API from "../api/axios";
import "../styles/login.css";

function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      await API.post("/auth/register", {
        name,
        email,
        password
      });

      alert("Registration successful");

    } catch (error) {
      console.log(error);
      alert("Registration failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Create Account</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="login-btn" onClick={handleRegister}>
          Register
        </button>

        <p className="register">
          Already have an account? <a href="/">Login</a>
        </p>

      </div>
    </div>
  );
}

export default Register;