const express = require("express")
const userController = require("../controllers/userController")
const router = express.Router()

router.route("/").get(userController.all).post(userController.create)
router
.route("/:id")
.get(userController.one)
.put(userController.update)
.delete(userController.delete)

module.exports = router