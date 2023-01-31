const express = require("express");
require("dotenv").config();
const {connectToMongodb} = require("./database");
const userRoute = require("./route/userRoute");
const blogRoute = require("./route/blogRoute");
const rateLimit = require("express-rate-limit");
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT;

connectToMongodb()

// rate limiting
const limiter = rateLimit({
	windowMs: 0.5 * 60 * 1000, // 15 minutes
	max: 4, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

app.use(express.json());
app.use(helmet());
app.use(limiter);

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