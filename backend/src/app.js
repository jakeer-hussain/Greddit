const cors = require("cors");

const express = require("express");

const postsRoutes = require("./routes/posts.routes");

const app = express();

app.use(cors());

app.use(express.json());

// mount routes
app.use("/auth", require("./routes/auth.routes"));
app.use("/users", require("./routes/user.routes"));
app.use("/posts", postsRoutes);
app.use("/channels", require("./routes/channel.routes"));
app.use("/messages", require("./routes/message.routes"));

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

module.exports = app;
