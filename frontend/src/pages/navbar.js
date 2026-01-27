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
        <Link to="/subgreddit" style={{ color: "#d7dadc", textDecoration: "none", marginLeft: "20px", fontSize: "14px", fontWeight: "600" }}>Subgreddit</Link>
        <Link to="/community" style={{ color: "#d7dadc", textDecoration: "none", marginLeft: "20px", fontSize: "14px", fontWeight: "600" }}>Community</Link>
      </div>

      {/* Center section */}
      <div className="nav-center">
        <Link to="/search" className="search-link" style={{
          color: "#d7dadc",
          textDecoration: "none",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "6px 12px",
          borderRadius: "20px",
          background: "#272729",
          border: "1px solid #343536"
        }}>
          <span style={{ fontSize: "18px" }}>🔍</span>
          <span style={{ fontSize: "14px", fontWeight: "500" }}>Search Greddit</span>
        </Link>
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
