const express = require("express")
const authSms = require("../middlewares/authSms")
const router = express.Router()

router.route("/")
.post(authSms.authSms)

module.exports = router