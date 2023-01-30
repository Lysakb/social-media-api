const blogModel = require("../Model/blog");
const userModel = require("../Model/user");

const getAllBlogs = async(req, res, next)=>{
    let blogs = {}
   try{
    let blogs = await blogModel.find()

    if(!blogs){
        return res.status(500).send("No blogs!")
    }
    
    res.status(200).send(blogs)
   }catch(error){
    res.status(400).send(error)
   }
}

const getAllBlogById = async(req, res, next)=>{
   const id = req.params.id;

   try{
    const blog = await blogModel.findById(id)

    if(!blog){
        return res.status(500).send("No blog!")
    }
    res.status(200).send(blog)
   }catch(error){
    res.status(400).send(error)
   }
}

const addBlog = async(req, res, next)=>{
    const {title, description, image, user} = req.body;

    if(!title || !description || !image || !user){
        return res.status(404).send("Fill appropriate fields!")
    }
    try{
        const addBlog = await blogModel.create({
            title: title,
            description: description,
            image: image,
            user: user
        })
        //    await userModel.blog = addBlog.id 
            res.status(200).send(addBlog) 
        }catch(error){
            res.status(400).send(error)
        }
       
}

const updateBlog = async(req, res, next) =>{
    const id = req.params.id;
    const {title, description, image, user} = req.body;
    try{
        const updateBlog = await blogModel.findByIdAndUpdate(id, {
            $set: {
                title: title,
                description: description,
                image: image,
                user: user
            },
        },
        {new: true}
        )
        if(!blog){
            return res.status(404).send("No blog found!")
        }
        res.status(200).send({
            message:"Updated successfully",
            updateBlog})
    }catch(error){
        res.status(400).send(error.message)
    }
}

const deleteBlog = async(req, res, next)=>{
    const id = req.params.id;

    try{
        const deleteBlog = await blogModel.findByIdAndDelete(id)

        res.status(200).send("Deleted successfully")
    }catch(error){
        res.status(400).send(error)
    }
}

module.exports = {getAllBlogs, getAllBlogById, addBlog, updateBlog, deleteBlog}