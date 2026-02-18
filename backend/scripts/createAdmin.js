require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../src/models/user.model");

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB Connected");

        const adminEmail = "admin@social.com";

        const existingAdmin = await User.findOne({ email: adminEmail });

        if (existingAdmin) {
            console.log("Admin already exists.");
            process.exit();
        }

        const hashedPassword = await bcrypt.hash("admin123", 10);

        const admin = await User.create({
            username: "admin",
            email: adminEmail,
            password: hashedPassword,
            role: "admin"
        });

        console.log("Admin created successfully:");
        console.log({
            username: admin.username,
            email: admin.email,
            role: admin.role
        });

        process.exit();

    } catch (error) {
        console.error("Error creating admin:", error);
        process.exit(1);
    }
};

createAdmin();
