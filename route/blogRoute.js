const express = require("express");
const{getAllBlogs, addBlog, updateBlog, deleteBlog, getAllBlogById} = require("../Controller/blogController");
const userAuthenticate = require("../middleware/auth");

const blogRoute = express.Router();

blogRoute.get("/", getAllBlogs);
blogRoute.get("/:id", getAllBlogById);
blogRoute.post("/add",userAuthenticate, addBlog);
blogRoute.put("/update/:id", userAuthenticate, updateBlog);
blogRoute.delete("/delete/:id", userAuthenticate, deleteBlog);

module.exports = blogRoute;