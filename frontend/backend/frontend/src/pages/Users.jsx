import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios"; // your axios instance
import "../styles/users.css";

function Users() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Fetch users from backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await API.get("/auth/users"); // backend endpoint
        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchUsers();
  }, []);

  // Add new user
  const addUser = async () => {
    if (!name || !email) return alert("Name and email are required");

    const newUser = { name, email };

    try {
      const res = await API.post("/auth/register", newUser); // create user in backend
      setUsers([...users, res.data]); // update local state
      setName("");
      setEmail("");
    } catch (err) {
      console.error("Error adding user:", err);
      alert("Failed to add user.");
    }
  };

  // Delete user
  const deleteUser = async (id) => {
    try {
      await API.delete(`/auth/${id}`); // delete from backend
      setUsers(users.filter((u) => u._id !== id));
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Failed to delete user.");
    }
  };

  return (
    <div className="users-container">
      <h1>User Management</h1>

      <button className="back-btn" onClick={() => navigate("/dashboard")}>
        ← Back to Dashboard
      </button>

      <div className="add-user">
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={addUser}>Add User</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => deleteUser(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;