const express = require("express")
const multer = require("multer")
const AcomodationController = require("../controllers/acomodationController")
const router = express.Router()

router
    .route("/")
    .get(AcomodationController.all)
    .post(AcomodationController.create)
router
    .route("/:id")
    .get(AcomodationController.one)
    .put(AcomodationController.update)
    .delete(AcomodationController.delete)
module.exports = router