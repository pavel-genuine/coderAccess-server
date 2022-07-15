const { Router } = require("express");
const { getAllPromoControllers, addPromoController, getSinglePromoController, updatePromoController, deletePromoController }= require("../controllers/promo.controllers");


const promoRouter = Router()

promoRouter.route('/')
    .get(getAllPromoControllers)
    .post(addPromoController)

promoRouter.route('/:id')
    .get(getSinglePromoController)
    .patch(updatePromoController)
    .delete(deletePromoController)

module.exports = {promoRouter}