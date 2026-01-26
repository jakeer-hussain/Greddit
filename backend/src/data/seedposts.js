require("dotenv").config();
const connectDB = require("../config/db");
const Post = require("../models/posts");

const posts = [
  {
    title: "First Post",
    author: "jakeer",
    time: "12:00PM_25-Jan-2026",
    votes: 69,
    image: "https://kinsta.com/wp-content/uploads/2022/06/what-is-react-js-feature-image.png",
    content: "Hello world!"
  },
  {
    title: "Second Post",
    author: "jakeer",
    time: "12:00PM_25-Jan-2026",
    votes: 69,
    image: "https://kinsta.com/wp-content/uploads/2022/06/what-is-react-js-feature-image.png",
    content: "Learning Express is fun"
  }
  // add rest if you want
];

const seed = async () => {
  await connectDB();
  await Post.deleteMany();
  await Post.insertMany(posts);
  console.log("Posts seeded");
  process.exit();
};

seed();
