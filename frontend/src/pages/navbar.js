import "./navbar.css";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigationhandler = useNavigate();
  function handlelogin() {
    navigationhandler("/login");
  }
  return (
    <nav className="navbar">
      {/* Left section */}
      <div className="nav-left">
        <div className="logo">
          <span className="logo-icon">🧵</span>
          <span className="logo-text">Greddit</span>
        </div>

        <div className="nav-links">
          <a href="#">Posts</a>
          <a href="#">SubGreddit</a>
        </div>
      </div> 

      {/* Center section */}
      <div className="nav-center">
        <input
          type="text"
          placeholder="Search Greddit"
          className="search-bar"
        />
      </div>

      {/* Right section */}
      <div className="nav-right">
        <button className="create-btn">+ Create</button>
        <a href="#">My Account</a>
        <button className="auth-btn" onClick={handlelogin}>Login</button>
        {/* later you can toggle Login / Logout */}
      </div>
    </nav>
  );
}
