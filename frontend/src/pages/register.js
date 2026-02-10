import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";
import "../Stylesheets/login.css"; // Reusing login styles for consistency

export default function Register() {
    const { registerUser } = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!username || !email || !password) {
            alert("Please fill all fields");
            return;
        }
        registerUser(username, email, password);
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2 className="login-title">Register</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        className="login-input"
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        className="login-input"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        className="login-input"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="login-btn" type="submit">
                        Register
                    </button>
                </form>
                <p style={{ marginTop: "10px", textAlign: "center" }}>
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
}
