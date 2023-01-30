const express = require("express");
const userRoute = express.Router();


const  {getAllUsers, userSignup, userLogin} = require("../Controller/userController");

userRoute.get("/", getAllUsers);
userRoute.post("/signup", userSignup);
userRoute.post("/login", userLogin);

module.exports = userRoute;