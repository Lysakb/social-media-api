const express = require("express");
const bcrypt = require("bcrypt");
const userModel = require("../Model/user");

const getAllUsers = async(req, res, next)=>{
    let user = {}
    try {
        let user = await userModel.find()
        res.status(200).send(user)
    } catch (error) {
        res.status(400).send(err)
    }

    if(!user){
        return res.status(400).send({message: "Please signup"})
    }

}

const userSignup = async(req, res)=>{
  
    try{
        const {username, email, password} = req.body;
        console.log(username)
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password, salt)
        const user = new userModel({
            username: username,
            email: email,
            password: hashedpassword

        })
        const saveduser = await user.save()
        console.log(user)
        console.log(saveduser)
        console.log(userModel)
    }
    
    catch(error){
        console.log(error)
    }
}

const userLogin = async(req, res, next)=>{
    const {email, password} = req.body;
    try {
        let existingUser = await userModel.findOne(email)
    } catch (error) {
        res.status(400).send(err)
    }

    if (!existingUser) {
        return res.status(400).send({message:"User not found, please signup!"})
    }

    const comparePassword = await bcrypt.compare(password, existingUser.password)
        if (!comparePassword) {
            return res.status(400).send("Incorrect password!")
        }
        return res.status(200).send("Login successsfull!")
}

module.exports = {getAllUsers, userSignup, userLogin}