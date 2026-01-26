import { createContext, useState, useEffect } from "react";
import { jwtDecode as jwt_decode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem("authTokens")
            ? JSON.parse(localStorage.getItem("authTokens"))
            : null
    );
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const loginUser = async (username, password) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL || "http://localhost:8000"}/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.status === 200) {
                setAuthTokens(data);
                setUser(jwt_decode(data.token));
                localStorage.setItem("authTokens", JSON.stringify(data));
                navigate("/");
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Login Error:", error);
            alert("Something went wrong!");
        }
    };

    const registerUser = async (username, email, password) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL || "http://localhost:8000"}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await response.json();

            if (response.status === 201) {
                setAuthTokens(data);
                setUser(jwt_decode(data.token));
                localStorage.setItem("authTokens", JSON.stringify(data));
                navigate("/");
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Register Error:", error);
            alert("Something went wrong!");
        }
    };

    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem("authTokens");
        navigate("/login");
    };

    useEffect(() => {
        if (authTokens) {
            const decoded = jwt_decode(authTokens.token);
            // Merge decoded token with the rest of the authTokens data
            setUser({ ...authTokens, ...decoded });
        }
        setLoading(false);
    }, [authTokens]);

    const contextData = {
        user,
        authTokens,
        loginUser,
        registerUser,
        logoutUser,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
};
