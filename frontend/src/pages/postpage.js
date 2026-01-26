import React, { useEffect, useState } from "react";
import "../Stylesheets/post.css";
import NavBar from "./navbar";
import { useNavigate } from "react-router-dom";

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Fetching posts...")
    console.log(process.env.BACKEND_URL);
    fetch("http://localhost:8000" + "/posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching posts:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="loading">Loading posts...</div>;
  }

  return (
    <>
      <NavBar />
      <div className="posts-page">
        {posts.map((post) => (
          <div
            key={post.id}
            className="post-container"
            onClick={() => navigate(`/post/${post.id}`)}   // 👈 navigate to SinglePostPage
          >
            <div className="vote-section">
              <div className="vote-arrow">⬆️</div>
              <div className="vote-count">{post.votes}</div>
              <div className="vote-arrow">⬇️</div>
            </div>

            <div className="post-content">
              <h2 className="post-title">{post.title}</h2>

              <p className="post-meta">
                Posted by{" "}
                <span className="post-author">u/{post.author}</span> •{" "}
                <span className="post-time">{post.time}</span>
              </p>

              {post.image && (
                <img src={post.image} alt="post" className="post-image" />
              )}

              <p className="post-text">{post.content}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
