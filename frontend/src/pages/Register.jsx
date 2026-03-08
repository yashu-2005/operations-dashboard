import "../styles/login.css";

function Register() {
  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Create Account</h2>

        <input type="text" placeholder="Full Name" />

        <input type="email" placeholder="Email" />

        <input type="password" placeholder="Password" />

        <button className="login-btn">Register</button>

        <p className="register">
          Already have an account? <a href="/">Login</a>
        </p>

      </div>
    </div>
  );
}

export default Register;