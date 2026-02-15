const Post = require("../models/posts");

// @desc    Get all posts
// @route   GET /posts
// @access  Public
exports.getAllPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const totalPosts = await Post.countDocuments();

    const posts = await Post.find()
      .populate("author", "username profilePic")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      posts,
      currentPage: page,
      totalPages: Math.ceil(totalPosts / limit),
      totalPosts
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// @desc    Get single post
// @route   GET /posts/:id
// @access  Public
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("author", "username profilePic")
      .populate("comments.user", "username profilePic");

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a post
// @route   POST /posts
// @access  Private
exports.createPost = async (req, res) => {
  try {
    const { title, content, image, tags } = req.body;

    const post = await Post.create({
      title,
      content,
      image,
      tags: tags || [],
      author: req.user.id,
    });

    const populatedPost = await Post.findById(post._id).populate("author", "username profilePic");

    res.status(201).json(populatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Like/Unlike a post
// @route   PUT /posts/like/:id
// @access  Private
exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Use toString() to compare ObjectIds with strings robustly
    const userIndex = post.likes.findIndex(id => id.toString() === req.user.id.toString());

    if (userIndex !== -1) {
      post.likes.splice(userIndex, 1);
    } else {
      post.likes.push(req.user._id);
    }

    await post.save();
    res.json({ likes: post.likes });
  } catch (error) {
    console.error("Like Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Comment on a post
// @route   POST /posts/comment/:id
// @access  Private
exports.commentPost = async (req, res) => {
  try {
    const { text } = req.body;
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const comment = {
      user: req.user.id,
      text,
      createdAt: Date.now(),
    };

    post.comments.push(comment);
    await post.save();

    const populatedPost = await Post.findById(req.params.id)
      .populate("comments.user", "username profilePic");

    res.json(populatedPost.comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a post
// @route   DELETE /posts/:id
// @access  Private
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check for admin or author
    // Note: req.user is populated by protect middleware
    if (req.user.isAdmin || (post.author && post.author.toString() === req.user._id.toString()) || req.user.username === "admin") {
      await Post.findByIdAndDelete(req.params.id);
      res.json({ message: "Post removed" });
    } else {
      res.status(401).json({ message: "User not authorized" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get posts by tag
// @route   GET /posts/tag/:tag
// @access  Public
exports.getPostsByTag = async (req, res) => {
  try {
    const posts = await Post.find({ tags: req.params.tag })
      .populate("author", "username profilePic")
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


