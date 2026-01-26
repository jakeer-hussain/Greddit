import { useState } from "react";
import "../Stylesheets/login.css";
import { useNavigate } from "react-router-dom";

export default function Login( { setUser } ) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleNext() {
    if (!username || !password) {
      alert("Enter username & password");
      return;
    }

    setUser({ username, password });

    navigate("/details");
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Login</h2>

        <input
          className="login-input"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="login-input"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="login-btn" onClick={handleNext}>
          Continue
        </button>
      </div>
    </div>
  );
}
