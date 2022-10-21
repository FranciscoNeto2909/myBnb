const express = require("express")
const multer = require("multer")
const multerConfigs = require("../configs/multer")
const router = express.Router()
const image = require("../models/image")
const img = require("../controllers/imageController")

router
    .route("/")
    .get(img.all)
    .post(multer(multerConfigs).single("fileimage"), async (req, res) => {
        const { originalname: name, size, filename: key } = req.file;
        console.log(req.file)
        const post = await image.create({
            name,
            size,
            key,
            url: ""
        })
        return res.json(post)
    })

module.exports = router 