const Channel = require("../models/channel.model");

exports.createChannel = async (req, res) => {
    try {
        const { name, description, icon } = req.body;
        const newChannel = new Channel({
            name,
            description,
            icon,
            createdBy: req.user._id
        });
        await newChannel.save();
        res.status(201).json(newChannel);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllChannels = async (req, res) => {
    try {
        const channels = await Channel.find().populate("createdBy", "username");
        res.json(channels);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.searchChannels = async (req, res) => {
    try {
        const { query } = req.query;
        const channels = await Channel.find({
            $or: [
                { name: { $regex: query, $options: "i" } },
                { description: { $regex: query, $options: "i" } }
            ]
        }).populate("createdBy", "username");
        res.json(channels);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
