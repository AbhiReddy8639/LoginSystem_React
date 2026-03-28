import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

export default function HomePage() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const [time, setTime] = useState("");
  const [openMenu, setOpenMenu] = useState(false);

  /* ✅ Redirect if not logged in */
  useEffect(() => {
    if (!role) navigate("/login");
  }, [role, navigate]);

  /* ✅ Live Time */
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();

      const formatted =
        now.toLocaleDateString() +
        " | " +
        now.toLocaleTimeString();

      setTime(formatted);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="home-page">
      <div className="top-bar">

        {/* LEFT ROLE */}
        <div className="top-left">
          {role}
        </div>

        {/* RIGHT PANEL */}
        <div className="top-right">

          <div
            className="profile-area"
            onClick={() => setOpenMenu(!openMenu)}
          >
            <div className="profile-icon">👤</div>
            <div className="time-text">{time}</div>
          </div>

          {openMenu && (
            <div className="dropdown-menu">
              <div onClick={logout}>Logout</div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}