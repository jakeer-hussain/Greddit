import React, { useEffect, useState } from "react";
import NavBar from "./navbar";
import api from "../utils/api";
import "../Stylesheets/adminPage.css"; // <<--- NEW CSS FILE

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
        <div className="admin-bg">
            <NavBar />

            <div className="admin-container">
                <header className="admin-header">
                    <h1 className="admin-title">Admin Dashboard</h1>
                    <p className="admin-subtitle">Manage platform content and posts</p>
                </header>

                <div className="admin-search-card">
                    <form onSubmit={handleSearch} className="admin-search-form">
                        <input
                            type="text"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            placeholder="Search posts to manage..."
                            className="admin-search-input"
                        />
                        <button type="submit" className="admin-search-btn">
                            Search
                        </button>
                    </form>
                </div>

                {loading && <p className="admin-loading">Loading posts...</p>}
                {error && <p className="admin-error">{error}</p>}

                <div className="admin-posts-list">
                    {!loading && results.length === 0 && (
                        <p className="admin-empty">No posts found.</p>
                    )}

                    {results.map(post => (
                        <div key={post._id} className="admin-post-card">
                            <div className="admin-post-left">
                                <div className="admin-post-user">
                                    <img
                                        src={post.author?.profilePic || "https://www.redditstatic.com/avatars/avatar_default_02_A5A4A4.png"}
                                        alt="avatar"
                                        className="admin-avatar"
                                    />
                                    <span className="admin-username">u/{post.author?.username || "deleted"}</span>
                                    <span className="admin-date">
                                        • {new Date(post.createdAt).toLocaleDateString()}
                                    </span>
                                </div>

                                <h3 className="admin-post-title">{post.title}</h3>
                                <p className="admin-post-content">
                                    {post.content.substring(0, 200)}
                                    {post.content.length > 200 ? "..." : ""}
                                </p>
                            </div>

                            <button
                                onClick={() => handleDelete(post._id)}
                                className="admin-delete-btn"
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
