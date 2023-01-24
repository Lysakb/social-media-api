const express = require("express");
const{getAllBlogs, addBlog, updateBlog, deleteBlog, getAllBlogById} = require("../Controller/blogController");

const blogRoute = express.Router();

blogRoute.get("/", getAllBlogs);
blogRoute.get("/:id", getAllBlogById);
blogRoute.post("/add", addBlog);
blogRoute.put("/update/:id", updateBlog);
blogRoute.delete("/delete/:id", deleteBlog);

module.exports = blogRoute;