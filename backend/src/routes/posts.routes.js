const express = require("express");
const router = express.Router();
const {
    getAllPosts,
    getPostById,
    createPost,
    likePost,
    commentPost,
} = require("../controllers/posts.controller");
const { protect } = require("../middleware/auth.middleware");

// Public
router.get("/", getAllPosts);
router.get("/:id", getPostById);

// Private
router.post("/", protect, createPost);
router.put("/like/:id", protect, likePost);
router.post("/comment/:id", protect, commentPost);

module.exports = router;
