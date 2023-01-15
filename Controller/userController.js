const express = require("express");
const bcrypt = require("bcrypt");
const userSchema = require("../Model/user");

const getAllUsers = async(req, res, next)=>{
    try {
        let user = await userSchema.find()
    } catch (error) {
        res.status(400).send(err)
    }

    if(!user){
        return res.status(400).send({message: "Please signup"})
    }
    res.status(200).send({user})
}

const userSignup = async(req, res, next)=>{
    const {username, email, password} = req.body;

    try {
        let existingUser = await userSchema.findOne({email});

        res.status(200).send({message:"User exists please login"})

    } catch (error) {
        res.status(400).send(err.message)
    }


    try {
        let user = await userSchema.create({
            username: username,
            email: email,
            password: password
        })

        const hashPassword = await bcrypt.hash(password);

        await user.save();

        res.status(200).send({
            message: "Signup successful",
            user
    })

    } catch (error) {
        res.status(400).send({message:"Please fill in the field"})
    }

}

const userLogin = async(req, res, next)=>{
    const {email, password} = req.body;
    try {
        let existingUser = await userSchema.findOne(email)
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