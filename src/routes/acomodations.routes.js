const express = require("express")
const AcomodationController = require("../controllers/acomodationController")
const upload = require("../configs/multerMultiple")

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
    .put(upload.single('image'), AcomodationController.setImages)
    
module.exports = router