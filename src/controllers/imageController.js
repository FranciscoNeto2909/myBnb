const Image = require("../models/image")
module.exports = {
    async all(req, res) {
        try {
            const images = await Image.findAll()
            res.status(200).json(images)
        } catch (error) {
            res.status(400).send(error)
        }
    },
    async create(req, res) {
        try {
            const {name, size, fileName} = req.file
            console.log()
            if (name) {
                return res.status(400).json("Erro: acomodations alredy exist!")
            }
            await Acomodation.create(data)
            res.status(201).json("Acomodation registered successfully!")
        } catch (error) {
            res.status(400).send("faltam dados")
        }
    }
}