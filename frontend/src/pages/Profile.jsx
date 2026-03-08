import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../api/axios"; // your axios instance
import "../styles/profile.css";

function Profile() {
  const navigate = useNavigate();
  const location = useLocation();
  const userEmail = location.state?.userEmail;

  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    profilePic: "",
  });
  const [tasks, setTasks] = useState([]);

  // Fetch user data and tasks from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all users
        const usersRes = await API.get("/auth/users");
        const currentUser = usersRes.data.find(u => u.email === userEmail);
        if (currentUser) setUser(currentUser);

        // Fetch tasks for this user
        const tasksRes = await API.get("/tasks");
        const userTasks = tasksRes.data.filter(t => t.userEmail === userEmail);
        setTasks(userTasks);
      } catch (err) {
        console.error("Error fetching profile data:", err);
      }
    };

    if (userEmail) fetchData();
  }, [userEmail]);

  const handleProfilePic = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setUser({ ...user, profilePic: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const updateProfile = async () => {
    if (!user.name || !user.username || !user.email) return alert("All fields are required");

    try {
      await API.put(`/auth/${user._id}`, user); // Update user in backend
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile.");
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        <h1 className="profile-heading">User Profile</h1>

        <button className="back-btn" onClick={() => navigate("/users")}>
          ← Back to Users
        </button>

        <div className="profile-pic-container">
          {user.profilePic ? (
            <img src={user.profilePic} alt="Profile" className="profile-pic" />
          ) : (
            <div className="profile-placeholder">Upload</div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleProfilePic}
            className="profile-pic-input"
          />
        </div>

        <div className="profile-form">
          <input
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            placeholder="Full Name"
          />
          <input
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            placeholder="Username"
          />
          <input
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Email"
          />
          <input
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Password"
          />
          <button className="update-btn" onClick={updateProfile}>
            Update Profile
          </button>
        </div>

        <div className="user-tasks">
          <h2>My Tasks ({tasks.length})</h2>
          {tasks.map((t, i) => (
            <div key={i} className={`task-card ${t.priority.toLowerCase()}`}>
              <strong>{t.title}</strong> - {t.priority} - {t.status}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;