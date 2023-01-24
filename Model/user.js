const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
        minLength: [8, "length should not be less than 8 characters"]
    },

    blogs:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
        required: true
    }]
})

const userModel = mongoose.model("Users", userSchema)
module.exports = userModel

