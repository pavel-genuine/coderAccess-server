const { Router } = require("express");
const { getAllBlogsController, addBlogController, getSingleBlogController, updateBlogController, deleteBlogController }= require("../controllers/blogs.controllers");


const blogRouter = Router()

blogRouter.route('/')
    .get(getAllBlogsController)
    .post(addBlogController)
                        
    blogRouter.route('/:id')
    .get(getSingleBlogController)
    .put(updateBlogController)
    .delete(deleteBlogController)

module.exports = {blogRouter}