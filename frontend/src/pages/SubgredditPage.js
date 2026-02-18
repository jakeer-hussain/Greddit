import React, { useState } from "react";
import NavBar from "./navbar";
import api from "../utils/api";
import "../Stylesheets/subgreddit.css"
import { Link, useNavigate } from "react-router-dom";

export default function SubgredditPage() {
    const availableTags = ["Sports", "Movies", "Technology", "Gaming", "News", "Music"];
    const [selectedTag, setSelectedTag] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

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
    <div className="sub-page">
        <NavBar />

        <div className="sub-container">

            <header className="sub-header">
                <h1 className="sub-title">Subgreddit</h1>
                <p className="sub-subtitle">
                    Explore posts by category
                </p>
            </header>

            <div className="sub-tags">
                {availableTags.map(tag => (
                    <button
                        key={tag}
                        onClick={() => fetchPostsByTag(tag)}
                        className={`sub-tag-btn ${selectedTag === tag ? "active" : ""}`}
                    >
                        {tag}
                    </button>
                ))}
            </div>

            <div className="sub-posts-list">

                {loading && (
                    <p className="sub-loading">
                        Loading relevant posts...
                    </p>
                )}

                {!loading && selectedTag && posts.length === 0 && (
                    <p className="sub-empty">
                        No posts found for "{selectedTag}" yet.
                    </p>
                )}

                {!loading && selectedTag && posts.map(post => (
                    <div
                        key={post._id}
                        className="sub-post-card"
                        onClick={() => navigate(`/post/${post._id}`)}
                    >
                        <div className="sub-post-header">
                            <img
                                src={
                                    post.author?.profilePic ||
                                    "https://www.redditstatic.com/avatars/avatar_default_02_A5A4A4.png"
                                }
                                alt="avatar"
                                className="sub-post-avatar"
                            />

                            <Link
                                to={`/profile/${post.author?.username}`}
                                onClick={(e) => e.stopPropagation()}
                                className="sub-post-author"
                            >
                                u/{post.author?.username || "deleted"}
                            </Link>

                            <span className="sub-post-date">
                                • {new Date(post.createdAt).toLocaleDateString()}
                            </span>
                        </div>

                        <h3 className="sub-post-title">
                            {post.title}
                        </h3>

                        <p className="sub-post-content">
                            {post.content}
                        </p>

                        <div className="sub-post-footer">
                            🔼 {post.likes?.length || 0} likes • 💬 {post.comments?.length || 0} comments
                        </div>
                    </div>
                ))}

            </div>
        </div>
    </div>
);

}
