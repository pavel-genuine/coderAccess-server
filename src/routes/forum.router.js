const { Router } = require("express");
const {getAllForumController, addForumController, getSingleForumController, updateForumController, deleteForumController }= require("../controllers/forum.controllers");


const forumRouter = Router()

forumRouter.route('/')
    .get(getAllForumController)
    .post(addForumController)
                        
    forumRouter.route('/:id')
    .get(getSingleForumController)
    .put(updateForumController)
    .delete(deleteForumController)

module.exports = {forumRouter}