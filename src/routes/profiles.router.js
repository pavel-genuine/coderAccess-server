const { Router } = require("express");
const { getAllProfilesController, addProfileController, getSingleProfileController, updateProfileController, deleteProfileController }= require("../controllers/profile.controllers");


const profileRouter = Router()

profileRouter.route('/')
    .get(getAllProfilesController)
    .post(addProfileController)
                        
    profileRouter.route('/:email')
    .get(getSingleProfileController)
    .put(updateProfileController)
    .delete(deleteProfileController)

module.exports = {profileRouter}