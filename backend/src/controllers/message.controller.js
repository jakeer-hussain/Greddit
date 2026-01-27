const Message = require("../models/message.model");

exports.createMessage = async (req, res) => {
    try {
        const { channelId, content, image } = req.body;
        const newMessage = new Message({
            channel: channelId,
            sender: req.user._id,
            content,
            image
        });
        await newMessage.save();
        const populatedMessage = await Message.findById(newMessage._id).populate("sender", "username profilePic");
        res.status(201).json(populatedMessage);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getMessagesByChannel = async (req, res) => {
    try {
        const { channelId } = req.params;
        const messages = await Message.find({ channel: channelId })
            .populate("sender", "username profilePic")
            .sort({ createdAt: 1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
