import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import NavBar from "./navbar";
import api from "../utils/api";
import "../Stylesheets/profile.css";

export default function SearchPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const queryParam = searchParams.get("q") || "";

    const [searchInput, setSearchInput] = useState(queryParam);
    const [searchType, setSearchType] = useState("users");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = (e) => {
        if (e) e.preventDefault();
        if (!searchInput.trim()) return;
        setSearchParams({ q: searchInput });
    };

    useEffect(() => {
        if (queryParam) {
            setLoading(true);
            api.get(`/users/search-all/${queryParam}?type=${searchType}`)
                .then(({ data }) => {
                    setResults(data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error(err);
                    setLoading(false);
                });
        } else {
            setResults([]);
        }
    }, [queryParam, searchType]);

    return (
        <>
            <NavBar />
            <div className="search-page" style={{ maxWidth: "800px", margin: "20px auto", color: "white", padding: "0 20px" }}>
                <div className="search-controls" style={{ marginBottom: "30px", background: "#1a1a1b", padding: "20px", borderRadius: "8px", border: "1px solid #343536" }}>
                    <form onSubmit={handleSearch} style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
                        <input
                            type="text"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            placeholder="Search Greddit (users or posts)..."
                            style={{ flex: 1, padding: "12px", borderRadius: "4px", border: "1px solid #343536", background: "#272729", color: "white", outline: "none" }}
                        />
                        <button type="submit" style={{ padding: "10px 24px", borderRadius: "20px", border: "none", background: "#d7dadc", color: "black", fontWeight: "bold", cursor: "pointer" }}>
                            Search
                        </button>
                    </form>

                    <div className="search-toggle" style={{ display: "flex", gap: "25px", paddingLeft: "5px" }}>
                        <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "14px", fontWeight: searchType === "users" ? "bold" : "normal", color: searchType === "users" ? "white" : "#818384" }}>
                            <input
                                type="radio"
                                name="type"
                                value="users"
                                checked={searchType === "users"}
                                onChange={() => setSearchType("users")}
                                style={{ cursor: "pointer" }}
                            />
                            Users
                        </label>
                        <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", fontSize: "14px", fontWeight: searchType === "posts" ? "bold" : "normal", color: searchType === "posts" ? "white" : "#818384" }}>
                            <input
                                type="radio"
                                name="type"
                                value="posts"
                                checked={searchType === "posts"}
                                onChange={() => setSearchType("posts")}
                                style={{ cursor: "pointer" }}
                            />
                            Posts
                        </label>
                    </div>
                </div>

                {queryParam && <h2 style={{ fontSize: "18px", marginBottom: "20px", color: "#d7dadc" }}>Showing results for "{queryParam}" in {searchType}</h2>}

                {loading && <p style={{ textAlign: "center", marginTop: "40px", color: "#818384" }}>Searching Greddit...</p>}

                {!loading && queryParam && results.length === 0 && <p style={{ textAlign: "center", marginTop: "40px", color: "#818384" }}>No {searchType === "users" ? "users" : "posts"} found matching your search.</p>}

                <div className="results-list">
                    {searchType === "users" ? (
                        results.map(user => (
                            <div key={user._id} style={{ display: "flex", alignItems: "center", gap: "15px", background: "#1a1a1b", padding: "15px", margin: "10px 0", borderRadius: "5px", border: "1px solid transparent", transition: "border 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.borderColor = "#343536"} onMouseLeave={(e) => e.currentTarget.style.borderColor = "transparent"}>
                                <img src={user.profilePic || "https://www.redditstatic.com/avatars/avatar_default_02_A5A4A4.png"} alt="avatar" style={{ width: "50px", height: "50px", borderRadius: "50%", border: "2px solid #343536" }} />
                                <div>
                                    <Link to={`/profile/${user.username}`} style={{ color: "white", textDecoration: "none", fontWeight: "bold", fontSize: "18px" }}>
                                        u/{user.username}
                                    </Link>
                                    <p style={{ color: "#818384", margin: "5px 0 0", fontSize: "14px" }}>{user.bio || "No bio available"}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        results.map(post => (
                            <div key={post._id} style={{ background: "#1a1a1b", padding: "15px", margin: "15px 0", borderRadius: "5px", border: "1px solid #343536", cursor: "pointer" }} onClick={() => window.location.href = `/post/${post._id}`}>
                                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                                    <img src={post.author?.profilePic || "https://www.redditstatic.com/avatars/avatar_default_02_A5A4A4.png"} alt="avatar" style={{ width: "25px", height: "25px", borderRadius: "50%" }} />
                                    <Link to={`/profile/${post.author?.username}`} style={{ color: "#d7dadc", textDecoration: "none", fontSize: "12px", fontWeight: "bold" }} onClick={(e) => e.stopPropagation()}>
                                        u/{post.author?.username || "deleted"}
                                    </Link>
                                    <span style={{ color: "#818384", fontSize: "12px" }}>• Posted on {new Date(post.createdAt).toLocaleDateString()}</span>
                                </div>
                                <h3 style={{ margin: "10px 0", fontSize: "18px", color: "white" }}>{post.title}</h3>
                                <p style={{ color: "#d7dadc", fontSize: "14px", overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: "3", WebkitBoxOrient: "vertical", lineHeight: "1.5" }}>
                                    {post.content}
                                </p>
                                <div style={{ marginTop: "15px", display: "flex", gap: "15px", fontSize: "12px", color: "#818384" }}>
                                    <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>🔼 {post.likes?.length || 0} likes</span>
                                    <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>💬 {post.comments?.length || 0} comments</span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
}
