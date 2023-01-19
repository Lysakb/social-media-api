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
    }
})

// userSchema.pre("save", 
//     async function(next){
//         const user = this;
//         if(!user.isModified('password'))
//         return next();

//         const hash = await bcrypt.hash(user.password)

//         user.password = hash;
//         next()
//     }
// )
// console.log(userSchema)

const userModel = mongoose.model("Users", userSchema)
module.exports = userModel

console.log(userModel)