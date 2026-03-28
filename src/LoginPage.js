import { useState } from "react";
import {
  loginUser,
  forgotPassword,
  verifyResetToken,
  resetPassword,
  registerUser,
} from "./api";

import { useNavigate } from "react-router-dom";
import bgImage from "./images/loginsystem.jpg.png";
import "./LoginPage.css";   // ⭐ USE HMS CSS

export default function LoginPage() {
  const navigate = useNavigate();

  const [mode, setMode] = useState("login");

  const [form, setForm] = useState({ input: "", password: "" });
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");


  const [error, setError] = useState("");

  /* ================= LOGIN ================= */

  const submitLogin = async () => {
    setError("");

    try {
      const res = await loginUser(form);
      const lower = res.toLowerCase();

      if (lower.includes("invalid")) {
        setError("Incorrect Username or Password");
        return;
      }

      if (lower.includes("locked")) {
        setError("Account Locked. Try later.");
        return;
      }

      /* ✅ SUCCESS LOGIN */
    const role = res.includes("Admin") ? "Admin" : "User";

    localStorage.setItem("role", role);   // ⭐ SAVE SESSION

    navigate("/home");     

    } catch {
      setError("Server not reachable");
    }
  };

  /* ================= SEND OTP ================= */

 const sendOtp = async () => {
  setError("");

  try {
    const res = await forgotPassword(email);

    console.log("FORGOT PASSWORD RESPONSE:", res);

    /* ✅ SHOW POPUP */
    setModalMessage(res);     // message from backend
    setShowModal(true);       // open modal

    /* ✅ MOVE TO OTP SCREEN */
    if (res.toLowerCase().includes("token")) {
      setMode("reset");
    }

  } catch (err) {
    console.error(err);

    setModalMessage("Failed to send OTP");
    setShowModal(true);
  }
};

  /* ================= RESET ================= */

  const submitReset = async () => {
    setError("");

    try {
      const verify = await verifyResetToken({ token: otp });

      if (!verify.toLowerCase().includes("valid")) {
        setError("Invalid or Expired OTP");
        return;
      }

      const res = await resetPassword({
        token: otp,
        newPassword,
      });

      alert(res);
      setMode("login");

    } catch {
      setError("Reset failed");
    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        {/* LEFT IMAGE */}
        <div className="login-image">
          <img src={bgImage} alt="visual" />
        </div>

        {/* RIGHT FORM */}
        <div className="login-form">

          <h1>Login System</h1>
          <p className="subtitle"></p>

          {error && <div className="error-box">{error}</div>}

          {/* ================= LOGIN VIEW ================= */}
     {/* ================= LOGIN VIEW ================= */}
{mode === "login" && (
  <>
    <h2>Sign In</h2>

    <input
      className="login-input"
      placeholder="Username / Email"
      onChange={(e) =>
        setForm({ ...form, input: e.target.value })
      }
    />

    <input
      className="login-input"
      type="password"
      placeholder="Password"
      onChange={(e) =>
        setForm({ ...form, password: e.target.value })
      }
    />

    <button className="login-btn" onClick={submitLogin}>
      Login
    </button>

    <div className="auth-links">
      <span onClick={() => setMode("forgot")}>
        Forgot Password?
      </span>

      <span onClick={() => setMode("register")}>
        Create Account
      </span>
    </div>
  </>
)}
   
          
    

          {/* ================= FORGOT VIEW ================= */}

          {mode === "forgot" && (
            <>
              <input
                className="login-input"
                placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)}
              />

              <button className="login-btn" onClick={sendOtp}>
                Send OTP
              </button>

              <div className="login-footer">
                <span onClick={() => setMode("login")}>
                  Back to Login
                </span>
              </div>
            </>
          )}

          {/* ================= RESET VIEW ================= */}

          {mode === "reset" && (
            <>
              <input
                className="login-input"
                placeholder="Enter OTP"
                onChange={(e) => setOtp(e.target.value)}
              />

              <input
                className="login-input"
                type="password"
                placeholder="New Password"
                onChange={(e) => setNewPassword(e.target.value)}
              />

              <button className="login-btn" onClick={submitReset}>
                Save Password
              </button>

              <div className="login-footer">
                <span onClick={() => setMode("login")}>
                  Back to Login
                </span>
              </div>
            </>
          )}
         {mode === "register" && (
  <>
    <h2>Create Account</h2>

    <input
      className="login-input"
      placeholder="Username"
      onChange={(e) =>
        setForm({ ...form, username: e.target.value })
      }
    />

    <input
      className="login-input"
      placeholder="Email"
      onChange={(e) =>
        setForm({ ...form, email: e.target.value })
      }
    />

    <input
      className="login-input"
      type="password"
      placeholder="Password"
      onChange={(e) =>
        setForm({ ...form, password: e.target.value })
      }
    />

    <input
      className="login-input"
      placeholder="First Name"
      onChange={(e) =>
        setForm({ ...form, firstName: e.target.value })
      }
    />

    <input
      className="login-input"
      placeholder="Last Name"
      onChange={(e) =>
        setForm({ ...form, lastName: e.target.value })
      }
    />

    <select
      className="login-input"
      onChange={(e) =>
        setForm({ ...form, role: e.target.value })
      }
    >
      <option value="User">User</option>
      <option value="Admin">Admin</option>
    </select>

    <button
      className="login-btn"
      onClick={async () => {
        try {
          const res = await registerUser(form);

          if (res.toLowerCase().includes("successfully")) {
            alert("✅ Registered Successfully");
            setMode("login");
          } else {
            setError(res);
          }
        } catch {
          setError("Registration failed");
        }
      }}
    >
      Register
    </button>

    <div className="auth-links">
      <span onClick={() => setMode("login")}>
        Back to Login
      </span>
    </div>
  </>
)}
{showModal && (
  <div className="modal-overlay">
    <div className="modal-box">
      <p>{modalMessage}</p>
      <button onClick={() => setShowModal(false)}>OK</button>
    </div>
  </div>
)}

        </div>
      </div>
    </div>
  );
}