import "../Stylesheets/post.css";

export default function CommentInput() {
  return (
    <div className="comment-input-container">
      <textarea
        placeholder="Write a comment..."
        className="comment-input"
      ></textarea>
      <button className="comment-btn">Comment</button>
    </div>
  );
}
