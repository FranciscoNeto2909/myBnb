const express = require("express")
import authSms from "../middlewares/authSms"
const router = express.Router()

router.route("/", authSms.authSms)