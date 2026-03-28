import { useState } from "react";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import ForgotPassword from "./ForgotPassword";
import "./AuthModal.css";

export default function AuthModal({ onClose, onSuccess }) {
  const [tab, setTab] = useState("login");

  return (
    <div className="auth-overlay">
      <div className="auth-panel">

        <div className="auth-header">
          <button onClick={() => setTab("login")}>Sign In</button>
          <button onClick={() => setTab("register")}>Sign Up</button>
          <span onClick={onClose}>✖</span>
        </div>

        {tab === "login" && (
          <LoginPage
            onSuccess={onSuccess}
            onForgot={() => setTab("forgot")}
          />
        )}

        {tab === "register" && (
          <RegisterPage onBack={() => setTab("login")} />
        )}

        {tab === "forgot" && (
          <ForgotPassword onBack={() => setTab("login")} />
        )}

      </div>
    </div>
  );
}