const jwt = require("jsonwebtoken");

// Access Token (short lived)
const generateAccessToken = (id) => {
    return jwt.sign(
        { id },
        process.env.JWT_SECRET,
        { expiresIn: "2d" }
    );
};

// Refresh Token (long lived - future use)
const generateRefreshToken = (id) => {
    return jwt.sign(
        { id },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: "7d" }
    );
};

module.exports = {
    generateAccessToken,
    generateRefreshToken
};
