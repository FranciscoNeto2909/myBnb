const express = require("express")
const AcomodationController = require("../controllers/acomodationController")
const upload = require("../configs/multerMiltiple")

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
router
    .route("/images/:acomodationName")
    .post(upload.array('images'), AcomodationController.setImages)
module.exports = router