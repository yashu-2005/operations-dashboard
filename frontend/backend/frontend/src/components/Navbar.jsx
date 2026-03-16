import { Link } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">OpsDashboard</h2>
      <div className="nav-links">
        <Link to="/dashboard" className="nav-link">Dashboard</Link>
        <Link to="/tasks" className="nav-link">Tasks</Link>
        <Link to="/reports" className="nav-link">Reports</Link>
        <Link to="/profile" className="nav-link">Profile</Link>
        <Link to="/" className="nav-link logout">Logout</Link>
      </div>
    </nav>
  );
}

export default Navbar;