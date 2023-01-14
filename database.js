const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_DB_CONNECTION_URL = process.env.MONGO_DB_CONNECTION_URL;

function connectToMongodb(){
    mongoose.connect(MONGO_DB_CONNECTION_URL)

    mongoose.connection.on("connected", ()=>{
        console.log("Successfully connected to mongodb!")
    })

    mongoose.connection.on("error", (err)=>{
        console.log("Error in connection!")
    })
}

module.exports = {connectToMongodb}