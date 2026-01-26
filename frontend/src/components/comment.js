import "../Stylesheets/post.css";

export default function Comment({ author, time, text }) {
  return (
    <div className="comment-box">
      <p className="comment-meta">
        <strong>{author}</strong> • {time}
      </p>
      <p className="comment-text">{text}</p>
    </div>
  );
}
