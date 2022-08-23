const express = require("express")
const userController = require("../controllers/userController")
const { isAdmin } = require("../middlewares/auth")
const router = express.Router()

router
.route("/")
.get(userController.all)
.post(userController.create)
router
.route("/admin")
.get(isAdmin,userController.logedUsers)
router
.route("/:id")
.get(userController.one)
.put(userController.update)
.delete(userController.delete)
router
.route("/login")
.post(userController.login)

module.exports = router