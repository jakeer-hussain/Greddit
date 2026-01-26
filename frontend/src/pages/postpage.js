import React, { useEffect, useState, useContext } from "react";
import "../Stylesheets/post.css";
import NavBar from "./navbar";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import AuthContext from "../context/AuthContext";

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // New Post State
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [tag, setTag] = useState("Technology");
  const [showCreate, setShowCreate] = useState(false);

  const availableTags = ["Sports", "Movies", "Technology", "Gaming", "News", "Music"];

  const fetchPosts = async () => {
    try {
      const { data } = await api.get("/posts");
      setPosts(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching posts:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      await api.post("/posts", { title, content, image, tags: [tag] });
      setTitle("");
      setContent("");
      setImage("");
      setTag("Technology");
      setShowCreate(false);
      fetchPosts();
    } catch (error) {
      alert("Failed to create post");
    }
  };

  const handleLike = async (id) => {
    try {
      await api.put(`/posts/like/${id}`);
      fetchPosts(); // Refresh to update like count
    } catch (error) {
      if (!user) navigate("/login");
    }
  };

  if (loading) {
    return <div className="loading" style={{ color: "white", textAlign: "center", marginTop: "20px" }}>Loading posts...</div>;
  }

  return (
    <>
      <NavBar />
      <div className="posts-page">
        {user && (
          <div style={{ maxWidth: "600px", margin: "20px auto", textAlign: "center" }}>
            {!showCreate ? (
              <button className="create-btn" onClick={() => setShowCreate(true)}>+ Create New Post</button>
            ) : (
              <form onSubmit={handleCreatePost} className="create-post-form" style={{ background: "#1a1a1b", padding: "20px", borderRadius: "5px", border: "1px solid #343536" }}>
                <input className="login-input" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                <textarea className="login-input" placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} required rows="3" />
                <input className="login-input" placeholder="Image URL (optional)" value={image} onChange={(e) => setImage(e.target.value)} />
                <select
                  className="login-input"
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  style={{ background: "#272729", color: "white" }}
                >
                  {availableTags.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                  <button className="login-btn" type="submit">Post</button>
                  <button className="login-btn" type="button" onClick={() => setShowCreate(false)} style={{ background: "gray" }}>Cancel</button>
                </div>
              </form>
            )}
          </div>
        )}

        {posts.map((post) => (
          <div key={post._id} className="post-container">
            <div className="vote-section">
              <div className="vote-arrow" onClick={() => handleLike(post._id)} style={{ cursor: "pointer" }}>⬆️</div>
              <div className="vote-count">{post.likes.length}</div>
            </div>

            <div className="post-content" onClick={() => navigate(`/post/${post._id}`)} style={{ cursor: "pointer" }}>
              <h2 className="post-title">{post.title}</h2>

              <p className="post-meta">
                Posted by{" "}
                <span className="post-author">u/{post.author?.username || "Unknown"}</span> •{" "}
                <span className="post-time">{new Date(post.createdAt).toLocaleDateString()}</span>
              </p>

              {post.image && (
                <img src={post.image} alt="post" className="post-image" />
              )}

              <p className="post-text">{post.content}</p>

              <div className="post-footer">
                <span>💬 {post.comments.length} Comments</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
