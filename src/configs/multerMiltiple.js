const multer = require("multer")
const fs = require('fs');

module.exports = (multer({
    storage: multer.diskStorage({
        destination: async (req, file, cb) => {
            const dir = "./src/images/acomodations";
            cb(null, dir)
        },
        filename: (req, file, cb) => {
            cb(null, Date.now().toString() + "_" + file.originalname)
        }
    }),
}))