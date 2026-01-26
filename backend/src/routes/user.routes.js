const express = require("express");
const router = express.Router();
const {
    getUserProfile,
    updateProfile,
    followUser,
    searchUsers,
    searchAll,
} = require("../controllers/user.controller");
const { protect } = require("../middleware/auth.middleware");

router.get("/:username", getUserProfile);
router.put("/update", protect, updateProfile);
router.put("/follow/:id", protect, followUser);
router.get("/search/:query", searchUsers);
router.get("/search-all/:query", searchAll);

module.exports = router;
