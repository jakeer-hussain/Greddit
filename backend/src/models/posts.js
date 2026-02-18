const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    image: {
      type: String,
      default: ""
    },
    content: {
      type: String,
      required: true
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true
        },
        text: {
          type: String,
          required: true
        },
        createdAt: {
          type: Date,
          default: Date.now
        }
      }
    ],
    tags: [
      {
        type: String,
        trim: true
      }
    ]
  },
  { timestamps: true }
);

// Pagination (global feed)
postSchema.index({ createdAt: -1 });

// Profile page (author + sorting)
postSchema.index({ author: 1, createdAt: -1 });

// Tag filtering (subreddit-style)
postSchema.index({ tags: 1, createdAt: -1 });


module.exports = mongoose.model("Post", postSchema);
