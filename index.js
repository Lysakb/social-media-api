const express = require("express");
require("dotenv").config();
const {connectToMongodb} = require("./database");
// const router = require("./userRoute");

const app = express();
const PORT = process.env.PORT;

connectToMongodb()

app.use(express.json());
console.log(app)
// app.use("/", router);

// app.use((err, req, res, next)=>{
//     console.log(err);
//     res.status(400).send(err.message)
//     next()
// })

app.get("/", (req, res)=>{
    res.status(400).send("Home Page!!")
})

app.listen(PORT, ()=>{
    console.log(`Server listening at ${PORT}`)
})