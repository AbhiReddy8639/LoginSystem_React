import { useState } from "react";
import { registerUser } from "./api";
import { useNavigate } from "react-router-dom";
import bgImage from "./images/loginsystem.jpg.png";   // ⭐ SAME IMAGE
import "./AuthLayout.css";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    role: "User",
  });

  const [error, setError] = useState("");

  const submit = async () => {
    console.log("REGISTER BUTTON CLICKED");
    setError("");

    try {
      const res = await registerUser(form);

      console.log("REGISTER RESPONSE:", res);

      if (res.toLowerCase().includes("successfully")) {
        navigate("/login");
      } else {
        setError(res);   // ✅ Show backend message nicely
      }

    } catch (err) {
      console.error(err);
      setError("Server not reachable");
    }
  };

  return (
    <div className="auth-page">

      {/* LEFT IMAGE */}
      <div
        className="auth-left"
        style={{ backgroundImage: `url(${bgImage})` }}
      />

      {/* RIGHT FORM */}
      <div className="auth-right">
        <div className="auth-card">

          <h2>Create Account</h2>

          <input
            placeholder="Username"
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />

          <input
            placeholder="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <input
            placeholder="First Name"
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
          />

          <input
            placeholder="Last Name"
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
          />

          <select
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>

          <button type="button" onClick={submit}>
  Register
</button>

          {/* ✅ CLEAN ERROR UI */}
          {error && <div className="error-box">{error}</div>}

          <div className="auth-links">
            <span onClick={() => navigate("/login")}>
              Back to Login
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}