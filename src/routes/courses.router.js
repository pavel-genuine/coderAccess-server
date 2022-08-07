const { Router } = require("express");
const { getAllCouresController, addProfileController: addCourseController, getSingleProfileController: getSingleCourseController, updateCourseController, deleteCourseController}= require("../controllers/course.controllers");


const courseRouter = Router()

courseRouter.route('/')
    .get(getAllCouresController)
    .post(addCourseController)

    courseRouter.route('/:id')
    .get(getSingleCourseController)
    .patch(updateCourseController)
    .delete(deleteCourseController)

module.exports = {courseRouter: courseRouter}