import { useEffect, useState } from "react";
import { getAllUsers, deleteUser, updateUser } from "./api";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  const loadUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch {
      alert("❌ Failed to load users");
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const startEdit = (user) => {
    setEditingUser({
      ...user,
      role: user.role || "User",
    });
  };

  const saveEdit = async () => {
    try {
      const res = await updateUser(editingUser.userId, editingUser);
      alert(res);

      setEditingUser(null);
      loadUsers();
    } catch {
      alert("❌ Update failed");
    }
  };

  return (
    <div>
      <h2>Users</h2>
      <button onClick={loadUsers}>Refresh</button>

      <ul>
        {users.map((u) => (
          <li key={u.userId}>
            {u.username} — {u.email}

            <button onClick={() => startEdit(u)}>Edit</button>

            <button
              onClick={async () => {
                const res = await deleteUser(u.userId);
                alert(res);
                loadUsers();
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* ✅ EDIT PANEL */}
      {editingUser && (
        <div style={{ border: "1px solid gray", padding: 10, marginTop: 10 }}>
          <h3>Edit User</h3>

          <input
            value={editingUser.username}
            onChange={(e) =>
              setEditingUser({ ...editingUser, username: e.target.value })
            }
          />

          <input
            value={editingUser.email}
            onChange={(e) =>
              setEditingUser({ ...editingUser, email: e.target.value })
            }
          />

          <input
            placeholder="First Name"
            value={editingUser.firstName || ""}
            onChange={(e) =>
              setEditingUser({ ...editingUser, firstName: e.target.value })
            }
          />

          <input
            placeholder="Last Name"
            value={editingUser.lastName || ""}
            onChange={(e) =>
              setEditingUser({ ...editingUser, lastName: e.target.value })
            }
          />

          {/* ✅ ROLE DROPDOWN */}
          <select
            value={editingUser.role}
            onChange={(e) =>
              setEditingUser({ ...editingUser, role: e.target.value })
            }
          >
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>

          {/* ✅ ACTIVE STATUS */}
          <select
            value={editingUser.isActive ? "true" : "false"}
            onChange={(e) =>
              setEditingUser({
                ...editingUser,
                isActive: e.target.value === "true",
              })
            }
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>

          <br /><br />

          <button onClick={saveEdit}>Save</button>
          <button onClick={() => setEditingUser(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
}