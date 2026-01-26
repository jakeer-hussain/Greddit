import "./navbar.css";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

export default function NavBar() {
  const { user, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      {/* Left section */}
      <div className="nav-left">
        <Link to="/" className="logo">
          <span className="logo-icon">🧵</span>
          <span className="logo-text">Greddit</span>
        </Link>
      </div>

      {/* Center section */}
      <div className="nav-center">
        <input
          type="text"
          placeholder="Search Greddit"
          className="search-bar"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              navigate(`/search?q=${e.target.value}`);
            }
          }}
        />
      </div>

      {/* Right section */}
      <div className="nav-right">
        {user ? (
          <>
            <span style={{ marginRight: "10px", color: "white" }}>Hello, {user.username}</span>
            <Link to={`/profile/${user.username}`} style={{ color: "white", marginRight: "10px" }}>Profile</Link>
            <button className="auth-btn" onClick={logoutUser}>Logout</button>
          </>
        ) : (
          <button className="auth-btn" onClick={() => navigate("/login")}>Login</button>
        )}
      </div>
    </nav>
  );
}
