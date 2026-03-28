import "./LandingPage.css";
import { useNavigate } from "react-router-dom";
import bgImage from "./images/loginsystem.jpg.png";

export default function LandingPage({ user }) {
  const navigate = useNavigate();

  return (
    <div
      className="landing-container"
      style={{ backgroundImage: `url(${bgImage})` }}   /* ✅ FIXED */
    >
      <div className="top-right">
        {user ? (
          <div className="logged-user">👤 {user.role}</div>
        ) : (
          <div
            className="user-icon"
            onClick={() => navigate("/login")}
          >
            👤
          </div>
        )}
      </div>
    </div>
  );
}