const blogModel = require("../Model/blog");

const getAllBlogs = async(req, res, next)=>{
   try{
    const blogs = await blogModel.find()

    if(!blogs){
        return res.status(500).send("No blogs!")
    }
    
    res.status(200).send(blogs)
   }catch(error){
    res.status(400).send(error)
   }
}

module.exports = {getAllBlogs}