const express = require("express")
const AcomodationController = require("../controllers/acomodationController")
const upload = require("../configs/multerAcomodation")

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
    .post(upload.single('acomodationImage'), AcomodationController.setImages)
    
module.exports = router