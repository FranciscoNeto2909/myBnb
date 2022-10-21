const multer = require("multer")
const path = require("path")
const crpyto = require("crypto")

module.exports = {
    dest: path.resolve(__dirname, '..', 'images', 'test'),
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, '..', 'images', 'test'))
        },
        filename: (req, file, cb) => {
            crpyto.randomBytes(16, (err, hash) => {
                if (err)  cb(err)
                const fileName = `${hash.toString("hex")}-${file.originalname}`
                cb(null, fileName)
            })
        }
    })
}