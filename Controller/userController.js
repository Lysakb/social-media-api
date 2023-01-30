const express = require("express");
const bcrypt = require("bcrypt");
const userModel = require("../Model/user");
const jwt = require("jsonwebtoken")

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
            password: hashedpassword,
            blog: []

        })
        
        const oldUser = await userModel.findOne({email});

        if(oldUser){
            return res.status(409).send("User already exists, please Login!")
        }
       
        const saveduser = await user.save();
        res.status(200).send(saveduser);

    }
    
    catch(error){
        res.status(400).send(error)
    }
}

const userLogin = async(req, res)=>{
    try{
        const {email, password} = req.body;
        
        const user = await userModel.findOne({email});

        if(!user){
            return res.status(400).send({message: "Please signup, user not found!"})
        }

        const comparePassword = await bcrypt.compare(password, user.password);

        if(!comparePassword){
            return res.status(400).send("Incorrect Password")
        }

        //create token

        const userId = {
            id: user._id,
            email: user.email
        }
        const token = jwt.sign(userId, process.env.TOKEN_KEY, {expiresIn: '1h'} )

        res.status(200).send({
            message:"Login successful!",
            token
        })
    }catch(error){
        res.status(400).send(error)
    }
}

module.exports = {getAllUsers, userSignup, userLogin}