const cors = require("cors")
const express = require("express")
const sequelize = require("./configs/db")
const userRoutes = require("./routes/users.routes")
const AcomodationsRoutes = require("./routes/acomodations.routes")
const User = require("./models/user")
const app = express()
const port = process.env.PORT || "3000"

sequelize.sync().then(() => console.log("Database conected successfully..."))
app.use(express.json())
app.use(cors())
app.listen(port, console.log("executando..."))
app.use("/acomodations", AcomodationsRoutes)
app.use("/users", userRoutes)
function createUser() {
    User.create({name:"Neto", email:"neto12345", password:"neto125"})
}