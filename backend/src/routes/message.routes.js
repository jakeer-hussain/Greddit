const express = require("express");
const router = express.Router();
const messageController = require("../controllers/message.controller");
const { protect } = require("../middleware/auth.middleware");

router.post("/", protect, messageController.createMessage);
router.get("/:channelId", messageController.getMessagesByChannel);

module.exports = router;
