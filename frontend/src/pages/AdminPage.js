import React, { useEffect, useState } from "react";
import NavBar from "./navbar";
import api from "../utils/api";

export default function AdminPage() {
    const [searchInput, setSearchInput] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async (e) => {
        if (e) e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            // Reusing the search-all endpoint if it exists, or just getting all posts if empty search
            const endpoint = searchInput.trim()
                ? `/users/search-all/${searchInput}?type=posts`
                : `/posts`;

            const { data } = await api.get(endpoint);
            setResults(Array.isArray(data) ? data : data.posts || []);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch posts.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (postId) => {
        if (!window.confirm("Are you sure you want to delete this post?")) return;

        try {
            await api.delete(`/posts/${postId}`);
            setResults(results.filter(post => post._id !== postId));
            alert("Post deleted successfully.");
        } catch (err) {
            console.error(err);
            alert("Failed to delete post.");
        }
    };

    useEffect(() => {
        handleSearch();
    }, []);

    return (
        <div style={{ backgroundColor: "#030303", minHeight: "100vh", color: "#d7dadc" }}>
            <NavBar />
            <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "40px 20px" }}>
                <header style={{ marginBottom: "40px", borderBottom: "1px solid #343536", paddingBottom: "20px" }}>
                    <h1 style={{ fontSize: "28px", fontWeight: "bold", color: "#ff4500" }}>Admin Dashboard</h1>
                    <p style={{ color: "#818384" }}>Manage platform content and posts</p>
                </header>

                <div style={{ background: "#1a1a1b", padding: "20px", borderRadius: "8px", border: "1px solid #343536", marginBottom: "30px" }}>
                    <form onSubmit={handleSearch} style={{ display: "flex", gap: "10px" }}>
                        <input
                            type="text"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            placeholder="Search posts to manage..."
                            style={{ flex: 1, padding: "12px", borderRadius: "4px", border: "1px solid #343536", background: "#272729", color: "white", outline: "none" }}
                        />
                        <button type="submit" style={{ padding: "10px 24px", borderRadius: "20px", border: "none", background: "#ff4500", color: "white", fontWeight: "bold", cursor: "pointer" }}>
                            Search
                        </button>
                    </form>
                </div>

                {loading && <p style={{ textAlign: "center", color: "#818384" }}>Loading posts...</p>}
                {error && <p style={{ textAlign: "center", color: "#ff4500" }}>{error}</p>}

                <div className="admin-posts-list">
                    {!loading && results.length === 0 && <p style={{ textAlign: "center", color: "#818384" }}>No posts found.</p>}
                    {results.map(post => (
                        <div key={post._id} style={{ background: "#1a1a1b", padding: "20px", margin: "15px 0", borderRadius: "5px", border: "1px solid #343536", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                                    <img src={post.author?.profilePic || "https://www.redditstatic.com/avatars/avatar_default_02_A5A4A4.png"} alt="avatar" style={{ width: "24px", height: "24px", borderRadius: "50%" }} />
                                    <span style={{ color: "#d7dadc", fontSize: "12px", fontWeight: "bold" }}>u/{post.author?.username || "deleted"}</span>
                                    <span style={{ color: "#818384", fontSize: "12px" }}>• {new Date(post.createdAt).toLocaleDateString()}</span>
                                </div>
                                <h3 style={{ margin: "5px 0", fontSize: "18px", color: "white" }}>{post.title}</h3>
                                <p style={{ color: "#d7dadc", fontSize: "14px", marginTop: "10px" }}>{post.content.substring(0, 200)}{post.content.length > 200 ? "..." : ""}</p>
                            </div>
                            <button
                                onClick={() => handleDelete(post._id)}
                                style={{ background: "#381212", color: "#ff585b", border: "1px solid #ff585b", padding: "8px 16px", borderRadius: "4px", cursor: "pointer", marginLeft: "20px", fontWeight: "bold", transition: "all 0.2s" }}
                                onMouseEnter={(e) => { e.target.style.background = "#ff585b"; e.target.style.color = "white"; }}
                                onMouseLeave={(e) => { e.target.style.background = "#381212"; e.target.style.color = "#ff585b"; }}
                            >
                                Delete
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
