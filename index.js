const cors = require("cors")
const port = process.env.PORT || "3000"
const express = require("express")
const app = express()

app.use(express.json())
app.use(cors())
app.listen(port, console.log("executando..."))

app.get("/", (req, res)=>{
    return res.send(db)
})
app.post("/newschedule", (req, res)=>{
    const schedule = req.body
    if (schedule.requisitioner !== "") {
        db.schedules.push(schedule)
        res.send(schedule)
    } else {
        console.error()
    }
})
app.delete("/delschedule/:id",(req, res)=>{
    const scheduleId = req.params.id
    db.schedules = db.schedules.filter(scdl => scdl.id.toString() !== scheduleId.toString())
})