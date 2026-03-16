import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("currentUser"); // remove login data
    navigate("/login"); // go to login page
  };

  const user = localStorage.getItem("currentUser");

  if (!user) return null; // hide navbar if not logged in

  return (
    <nav className="navbar">
      <h2 className="logo">OpsDashboard</h2>
      <div className="nav-links">
        <Link to="/dashboard" className="nav-link">Dashboard</Link>
        <Link to="/tasks" className="nav-link">Tasks</Link>
        <Link to="/profile" className="nav-link">Profile</Link>

        <button onClick={handleLogout} className="nav-link logout">
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;