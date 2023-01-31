const express = require("express");
require("dotenv").config();
const {connectToMongodb} = require("./database");
const userRoute = require("./route/userRoute");
const blogRoute = require("./route/blogRoute");
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT;

connectToMongodb()

app.use(express.json());
app.use(helmet());

app.use("/user", userRoute);
app.use("/blog", blogRoute);

app.use((err, req, res, next)=>{
    console.log(err);
    res.status(400).send(err.message)
    next()
})

app.get("/", (req, res)=>{
    res.status(400).send("Home Page!!")
})

app.listen(PORT, ()=>{
    console.log(`Server listening at ${PORT}`)
})