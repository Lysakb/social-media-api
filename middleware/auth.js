const jwt = require('jsonwebtoken');
const userModel = require("../Model/user");
require("dotenv").config();

const userAuthenticate = async(req, res, next)=>{
    let token 

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    
        try{
            token = req.headers.authorization.split(" ")[1]

            const verifiedToken = jwt.verify(token, process.env.TOKEN_KEY)
            
            req.user = await userModel.findById(verifiedToken.id)
            
            next()
    
        }catch(error){
            res.status(401).send('Not authorized')
        }
    }
    if(!token){
        res.status(401).send('No token!')
    }
}





module.exports = userAuthenticate;
