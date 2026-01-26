import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import NavBar from "./navbar";
import api from "../utils/api";
import "../Stylesheets/profile.css";

export default function SearchPage() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (query) {
            setLoading(true);
            api.get(`/users/search/${query}`)
                .then(({ data }) => {
                    setResults(data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setLoading(false);
                });
        }
    }, [query]);

    return (
        <>
            <NavBar />
            <div className="search-page" style={{ maxWidth: "800px", margin: "20px auto", color: "white" }}>
                <h2>Search Results for "{query}"</h2>

                {loading && <p>Loading...</p>}

                {!loading && results.length === 0 && <p>No users found.</p>}

                <div className="results-list">
                    {results.map(user => (
                        <div key={user._id} style={{ display: "flex", alignItems: "center", gap: "15px", background: "#1a1a1b", padding: "10px", margin: "10px 0", borderRadius: "5px" }}>
                            <img src={user.profilePic || "https://www.redditstatic.com/avatars/avatar_default_02_A5A4A4.png"} alt="avatar" style={{ width: "50px", height: "50px", borderRadius: "50%" }} />
                            <div>
                                <Link to={`/profile/${user.username}`} style={{ color: "white", textDecoration: "none", fontWeight: "bold", fontSize: "18px" }}>
                                    u/{user.username}
                                </Link>
                                <p style={{ color: "#818384", margin: "5px 0 0" }}>{user.bio}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
