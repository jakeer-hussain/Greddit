const User = require("../models/user.model");
const Post = require("../models/posts");

// @desc    Get user profile by username
// @route   GET /users/:username
// @access  Public
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username })
            .select("-password")
            .populate("followers", "username profilePic")
            .populate("following", "username profilePic");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const posts = await Post.find({ author: user._id }).sort({ createdAt: -1 });

        res.json({ user, posts });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update user profile
// @route   PUT /users/update
// @access  Private
exports.updateProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (user) {
            user.bio = req.body.bio || user.bio;
            user.profilePic = req.body.profilePic || user.profilePic;
            if (req.body.username) user.username = req.body.username;

            const updatedUser = await user.save();

            res.json({
                _id: updatedUser._id,
                username: updatedUser.username,
                email: updatedUser.email,
                bio: updatedUser.bio,
                profilePic: updatedUser.profilePic,
                followers: updatedUser.followers,
                following: updatedUser.following
            });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Follow/Unfollow user
// @route   PUT /users/follow/:id
// @access  Private
exports.followUser = async (req, res) => {
    try {
        const currentUser = await User.findById(req.user.id);
        const userToFollow = await User.findById(req.params.id);

        if (!userToFollow) {
            return res.status(404).json({ message: "User not found" });
        }

        if (currentUser.following.includes(req.params.id)) {
            // Unfollow
            currentUser.following.pull(req.params.id);
            userToFollow.followers.pull(req.user.id);
            await currentUser.save();
            await userToFollow.save();
            res.json({ message: "User unfollowed" });
        } else {
            // Follow
            currentUser.following.push(req.params.id);
            userToFollow.followers.push(req.user.id);
            await currentUser.save();
            await userToFollow.save();
            res.json({ message: "User followed" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Search users
// @route   GET /users/search/:query
// @access  Public
exports.searchUsers = async (req, res) => {
    try {
        const query = req.params.query;
        const users = await User.find({
            username: { $regex: query, $options: "i" },
        }).select("username profilePic bio");

        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Search users or posts
// @route   GET /users/search-all/:query?type=users|posts
// @access  Public
exports.searchAll = async (req, res) => {
    try {
        const query = req.params.query;
        const type = req.query.type || "users";

        if (type === "posts") {
            const posts = await Post.find({
                $or: [
                    { title: { $regex: query, $options: "i" } },
                    { content: { $regex: query, $options: "i" } }
                ]
            }).populate("author", "username profilePic");
            res.json(posts);
        } else {
            const users = await User.find({
                username: { $regex: query, $options: "i" },
            }).select("username profilePic bio");
            res.json(users);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
