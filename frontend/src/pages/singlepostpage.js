import React, { useEffect, useState, useContext, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../Stylesheets/post.css";
import NavBar from "./navbar";
import api from "../utils/api";
import AuthContext from "../context/AuthContext";

export default function SinglePostPage() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchPost = useCallback(async () => {
    try {
      const { data } = await api.get(`/posts/${id}`);
      setPost(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching post:", err);
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate("/login");
      return;
    }
    try {
      await api.post(`/posts/comment/${id}`, { text: commentText });
      setCommentText("");
      fetchPost(); // Refresh comments
    } catch (error) {
      alert("Failed to post comment");
    }
  };

  const handleLike = async () => {
    try {
      await api.put(`/posts/like/${id}`);
      fetchPost();
    } catch (error) {
      if (!user) navigate("/login");
    }
  }

  if (loading) return <div style={{ color: "white", textAlign: "center", marginTop: "20px" }}>Loading post...</div>;
  if (!post) return <div style={{ color: "white", textAlign: "center", marginTop: "20px" }}>Post not found</div>;

  return (
    <>
      <NavBar />

      <div className="single-post-page" style={{ maxWidth: "800px", margin: "20px auto", color: "white" }}>

        <div className="post-container">
          <div className="vote-section">
            <div className="vote-arrow" onClick={handleLike} style={{ cursor: "pointer" }}>⬆️</div>
            <div className="vote-count">{post.likes.length}</div>
          </div>

          <div className="post-content">
            <h1 className="post-title">{post.title}</h1>

            <p className="post-meta">
              Posted by{" "}
              <span className="post-author">u/{post.author?.username || "Unknown"}</span> •{" "}
              <span className="post-time">{new Date(post.createdAt).toLocaleDateString()}</span>
            </p>

            {post.image && (
              <img src={post.image} alt="post" className="post-image" />
            )}

            <p className="post-text">{post.content}</p>
          </div>
        </div>

        {/* Comment Section */}
        <div className="comments-section" style={{ marginTop: "20px", padding: "20px", background: "#1a1a1b", borderRadius: "5px" }}>
          <h3>Comments</h3>

          {user && (
            <form onSubmit={handleCommentSubmit} style={{ marginBottom: "20px" }}>
              <textarea
                className="comment-input"
                placeholder="What are your thoughts?"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                style={{ width: "100%", padding: "10px", borderRadius: "5px", background: "#272729", border: "1px solid #343536", color: "white" }}
                rows="3"
              />
              <button className="comment-btn" type="submit" style={{ marginTop: "10px", padding: "5px 15px", borderRadius: "20px", border: "none", background: "white", fontWeight: "bold", cursor: "pointer" }}>
                Comment
              </button>
            </form>
          )}

          <div className="comments-list">
            {post.comments.map((comment, index) => (
              <div key={index} className="comment" style={{ marginBottom: "15px", borderBottom: "1px solid #343536", paddingBottom: "10px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "5px" }}>
                  {comment.user?.profilePic && <img src={comment.user.profilePic} alt="avatar" style={{ width: "30px", height: "30px", borderRadius: "50%" }} />}
                  <strong>{comment.user?.username || "Unknown"}</strong>
                  <span style={{ fontSize: "12px", color: "#818384" }}>{new Date(comment.createdAt).toLocaleDateString()}</span>
                </div>
                <p>{comment.text}</p>
              </div>
            ))}
            {post.comments.length === 0 && <p style={{ color: "#818384" }}>No comments yet</p>}
          </div>
        </div>

      </div>
    </>
  );
}
