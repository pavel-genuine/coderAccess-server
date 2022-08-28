const { Router } = require("express");
const {addReviewProfileController }= require("../controllers/reviewProfile.controllers");


const reviewProfileRouter = Router()

reviewProfileRouter.route('/')
    .post(addReviewProfileController)

module.exports = {reviewProfileRouter}
