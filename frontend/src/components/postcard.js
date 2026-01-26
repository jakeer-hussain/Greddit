import "../Stylesheets/posts.css";

export default function PostCard({ post }) {
  return (
    <div className="post-card">
      <div className="post-votes">
        <div>⬆️</div>
        <div className="post-vote-count">{post.votes}</div>
        <div>⬇️</div>
      </div>

      <div className="post-content">
        <h3 className="post-title">{post.title}</h3>
        <p className="post-meta">
          Posted by <span className="post-author">{post.author}</span> •{" "}
          {post.time}
        </p>

        {/* Only show text if available */}
        {post.content && (
          <p classnmae="post-text">{post.content}</p>
        )}

        {/* Only show image if available */}
        {post.image && (
          <img src={post.image} alt="" className="post-image" />
        )}
      </div>
    </div>
  );
}
