import React, { useEffect, useState, useContext } from "react";
import "../Stylesheets/postFeed.css";
import NavBar from "./navbar";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import AuthContext from "../context/AuthContext";

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);


  // New Post State
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [tag, setTag] = useState("Technology");
  const [showCreate, setShowCreate] = useState(false);

  const availableTags = ["Sports", "Movies", "Technology", "Gaming", "News", "Music"];

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`/posts?page=${page}&limit=5`);
      console.log(data)
      setPosts(data.posts);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error("Error fetching posts:", err);
    } finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [page]);

  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      await api.post("/posts", { title, content, image, tags: [tag] });
      setTitle("");
      setContent("");
      setImage("");
      setTag("Technology");
      setShowCreate(false);
      setPage(1);
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

    <div className="feed-page">

      {user && (
        <div className="feed-create-wrapper">
          {!showCreate ? (
            <button
              className="feed-create-btn"
              onClick={() => setShowCreate(true)}
            >
              + Create New Post
            </button>
          ) : (
            <form onSubmit={handleCreatePost} className="feed-create-form">
              <input
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />

              <textarea
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                rows="3"
              />

              <input
                placeholder="Image URL (optional)"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />

              <select
                value={tag}
                onChange={(e) => setTag(e.target.value)}
              >
                {availableTags.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>

              <div className="feed-form-buttons">
                <button type="submit">Post</button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowCreate(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      <div className="feed-container">
        {posts.map((post) => (
          <div key={post._id} className="feed-post-card">

            <div className="feed-vote-section">
              <div
                className="feed-vote-arrow"
                onClick={() => handleLike(post._id)}
              >
                ⬆️
              </div>
              <div className="feed-vote-count">
                {post.likes.length}
              </div>
            </div>

            <div
              className="feed-post-content"
              onClick={() => navigate(`/post/${post._id}`)}
            >
              <h2 className="feed-post-title">{post.title}</h2>

              <div className="feed-post-meta">
                Posted by{" "}
                <span className="feed-post-author">
                  u/{post.author?.username || "Unknown"}
                </span>{" "}
                •{" "}
                {new Date(post.createdAt).toLocaleDateString()}
              </div>

              {post.image && (
                <img
                  src={post.image}
                  alt="post"
                  className="feed-post-image"
                />
              )}

              <p className="feed-post-text">
                {post.content}
              </p>

              <div className="feed-post-footer">
                💬 {post.comments.length} Comments
              </div>
            </div>

          </div>
        ))}
      </div>

      <div className="feed-pagination">
        <button
          disabled={page === 1}
          onClick={() => setPage(prev => prev - 1)}
        >
          Previous
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(prev => prev + 1)}
        >
          Next
        </button>
      </div>

    </div>
  </>
);

}
