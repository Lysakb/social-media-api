const express = require("express");
const{getAllBlogs} = require("../Controller/blogController");

const blogRoute = express.Router();

blogRoute.get("/", getAllBlogs);

module.exports = blogRoute;