const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
    {
        channel: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Channel",
            required: true
        },
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        content: {
            type: String,
            required: false
        },
        image: {
            type: String,
            default: ""
        }
    },
    { timestamps: true }
);

// Chat messages retrieval (channel + chronological order)
messageSchema.index({ channel: 1, createdAt: 1 });


module.exports = mongoose.model("ChannelMessage", messageSchema);
