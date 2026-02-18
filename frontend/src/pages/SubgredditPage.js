import React, { useState } from "react";
import NavBar from "./navbar";
import api from "../utils/api";
import { Link } from "react-router-dom";

export default function SubgredditPage() {
    const availableTags = ["Sports", "Movies", "Technology", "Gaming", "News", "Music"];
    const [selectedTag, setSelectedTag] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchPostsByTag = async (tag) => {
        setLoading(true);
        setSelectedTag(tag);
        try {
            const { data } = await api.get(`/posts/tag/${tag}`);
            setPosts(data);
        } catch (error) {
            console.error("Error fetching tagged posts:", error);
            alert("Failed to load posts.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ backgroundColor: "#030303", minHeight: "100vh", marginTop: "30px", color: "#d7dadc" }}>
            <NavBar />
            <div style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 20px" }}>
                <header style={{ marginBottom: "30px", textAlign: "center" }}>
                    <h1 style={{ fontSize: "32px", fontWeight: "bold", color: "#ff4500" }}>Subgreddit</h1>
                    <p style={{ color: "#818384", marginTop: "10px" }}>Explore posts by category</p>
                </header>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center", marginBottom: "40px" }}>
                    {availableTags.map(tag => (
                        <button
                            key={tag}
                            onClick={() => fetchPostsByTag(tag)}
                            style={{
                                padding: "10px 20px",
                                borderRadius: "20px",
                                border: selectedTag === tag ? "1px solid #ff4500" : "1px solid #343536",
                                background: selectedTag === tag ? "#1a1a1b" : "#272729",
                                color: selectedTag === tag ? "#ff4500" : "white",
                                fontWeight: "bold",
                                cursor: "pointer",
                                transition: "all 0.2s"
                            }}
                        >
                            {tag}
                        </button>
                    ))}
                </div>

                <div className="posts-list">
                    {loading && <p style={{ textAlign: "center", color: "#818384" }}>Loading relevant posts...</p>}

                    {!loading && selectedTag && posts.length === 0 && (
                        <p style={{ textAlign: "center", color: "#818384" }}>No posts found for "{selectedTag}" yet.</p>
                    )}

                    {!loading && selectedTag && posts.map(post => (
                        <div key={post._id} style={{ background: "#1a1a1b", padding: "20px", margin: "15px 0", borderRadius: "5px", border: "1px solid #343536" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                                <img src={post.author?.profilePic || "https://www.redditstatic.com/avatars/avatar_default_02_A5A4A4.png"} alt="avatar" style={{ width: "25px", height: "25px", borderRadius: "50%" }} />
                                <Link to={`/profile/${post.author?.username}`} style={{ color: "#d7dadc", textDecoration: "none", fontSize: "12px", fontWeight: "bold" }}>
                                    u/{post.author?.username || "deleted"}
                                </Link>
                                <span style={{ color: "#818384", fontSize: "12px" }}>• {new Date(post.createdAt).toLocaleDateString()}</span>
                            </div>
                            <h3 style={{ margin: "5px 0", fontSize: "18px", color: "white" }}>{post.title}</h3>
                            <p style={{ color: "#d7dadc", fontSize: "14px", marginTop: "10px" }}>{post.content}</p>
                            <div style={{ marginTop: "15px", color: "#818384", fontSize: "12px" }}>
                                🔼 {post.likes?.length || 0} likes • 💬 {post.comments?.length || 0} comments
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
