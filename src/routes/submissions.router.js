
const { Router } = require("express");
const { getAllSubmissionsController, addSubmissionController, getSingleSubmissionController, updatSubmissionController, deleteSubmissionController }
= require("../controllers/submissions.controller");


const submissionsRouter = Router()

submissionsRouter.route('/')
    .get(getAllSubmissionsController)
    .post(addSubmissionController)
                        
    submissionsRouter.route('/:id')
    .get(getSingleSubmissionController)
    .put(updatSubmissionController)
    .delete(deleteSubmissionController)

module.exports = {submissionsRouter}