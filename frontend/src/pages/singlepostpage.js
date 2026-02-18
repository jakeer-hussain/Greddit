import React, { useEffect, useState, useContext, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../Stylesheets/singlePost.css";
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

    <div className="single-page-wrapper">

      <div className="single-post-card">

        <div className="single-vote-section">
          <div
            className="single-vote-arrow"
            onClick={handleLike}
          >
            ⬆️
          </div>
          <div className="single-vote-count">
            {post.likes.length}
          </div>
        </div>

        <div className="single-post-body">

          <h1 className="single-post-title">
            {post.title}
          </h1>

          <div className="single-post-meta">
            Posted by{" "}
            <span className="single-post-author">
              u/{post.author?.username || "Unknown"}
            </span>{" "}
            •{" "}
            {new Date(post.createdAt).toLocaleDateString()}
          </div>

          {post.image && (
            <img
              src={post.image}
              alt="post"
              className="single-post-image"
            />
          )}

          <p className="single-post-text">
            {post.content}
          </p>

        </div>
      </div>

      {/* Comments Section */}
      <div className="single-comments-card">
        <h3>Comments</h3>

        {user && (
          <form
            onSubmit={handleCommentSubmit}
            className="single-comment-form"
          >
            <textarea
              placeholder="What are your thoughts?"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              rows="3"
            />

            <button type="submit">
              Comment
            </button>
          </form>
        )}

        <div className="single-comments-list">
          {post.comments.map((comment, index) => (
            <div
              key={index}
              className="single-comment-item"
            >
              <div className="single-comment-header">
                {comment.user?.profilePic && (
                  <img
                    src={comment.user.profilePic}
                    alt="avatar"
                    className="single-comment-avatar"
                  />
                )}

                <strong>
                  {comment.user?.username || "Unknown"}
                </strong>

                <span className="single-comment-date">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>
              </div>

              <p className="single-comment-text">
                {comment.text}
              </p>
            </div>
          ))}

          {post.comments.length === 0 && (
            <p className="single-no-comments">
              No comments yet
            </p>
          )}
        </div>

      </div>

    </div>
  </>
);

}
