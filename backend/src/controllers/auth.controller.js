const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {generateAccessToken, generateRefreshToken} = require("../utils/generateToken");

// @desc    Register a new user
// @route   POST /auth/register
// @access  Public
exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        if (!username || !email || !password) {
            return res.status(400).json({ message: "Please add all fields" });
        }

        // Check if user exists
        const userExists = await User.findOne({ $or: [{ email }, { username }] });

        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
        });
 
        if (user) {
            res.status(201).json({
                _id: user.id,
                username: user.username,
                email: user.email,
                token: generateAccessToken(user.id),
            });
        } else {
            res.status(400).json({ message: "Invalid user data" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Authenticate a user
// @route   POST /auth/login
// @access  Public
exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        if (!username || !password) {
            return res.status(400).json({
                message: "Please provide username and password"
            });
        }

        // Find user
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        // Successful login
        res.status(200).json({
            _id: user.id,
            username: user.username,
            email: user.email,
            profilePic: user.profilePic,
            role: user.role,
            token: generateAccessToken(user.id),
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// @desc    Get user data
// @route   GET /auth/me
// @access  Private
exports.getMe = async (req, res) => {
    res.status(200).json(req.user);
};
