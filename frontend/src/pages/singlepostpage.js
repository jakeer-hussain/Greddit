import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../Stylesheets/post.css";
import NavBar from "./navbar";

export default function SinglePostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  // Fetch single post
  useEffect(() => {
    fetch(`http://10.1.131.179:5000/posts/${id}`)
      .then((res) => res.json())
      .then((data) => setPost(data.data))
      .catch((err) => console.error("Error fetching post:", err));
  }, [id]);

  if (!post) return <p>Loading...</p>;

  return (
    <>
      <NavBar />

      <div className="single-post-page">

        <h1 className="post-title">{post.title}</h1>

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
    </>
  );
}
