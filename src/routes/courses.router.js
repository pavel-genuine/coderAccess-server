const { Router } = require("express");
const { getAllCouresController, addCourseController: addCourseController, getSingleCourseController: getSingleCourseController, updateCourseController, deleteCourseController}= require("../controllers/courses.controllers");


const courseRouter = Router()

courseRouter.route('/')
    .get(getAllCouresController)
    .post(addCourseController)

    courseRouter.route('/:id')
    .get(getSingleCourseController)
    .patch(updateCourseController)
    .delete(deleteCourseController)

module.exports = {courseRouter}