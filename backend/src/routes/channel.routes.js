const express = require("express");
const router = express.Router();
const channelController = require("../controllers/channel.controller");
const { protect } = require("../middleware/auth.middleware");

router.post("/", protect, channelController.createChannel);
router.get("/", channelController.getAllChannels);
router.get("/search", channelController.searchChannels);

module.exports = router;
