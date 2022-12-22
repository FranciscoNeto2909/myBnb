const fs = require("fs")
const Acomodation = require("../models/acomodation")

module.exports = {
    async all(req, res) {
        try {
            const acomodations = await Acomodation.findAll()
            res.status(200).json(acomodations)
        } catch (error) {
            res.status(400).send(error)
        }
    },
    async one(req, res) {
        try {
            const id = req.params.id
            const acomodation = await Acomodation.findOne({ where: { id } })
            if (!acomodation) {
                return res.status(400).json("Acomodation not found!")
            }
            res.status(200).json(acomodation)
        } catch (error) {
            res.status(400).send(error)
        }
    },

    async create(req, res) {
        try {
            const data = req.body
            const { hostLocalization } = data
            const acomodation = await Acomodation.findOne({ where: { hostLocalization } })

            if (acomodation) {
                return res.status(400).json("Erro: acomodations alredy exist!")
            } else {
                await Acomodation.create(data)
                res.status(201).json({
                    erro: false,
                    msg: "Acomodation registered successfully!"
                })
            }
        } catch (error) {
            res.status(400).json("faltam dados" + error)
        }
    },
    async setImages(req, res) {
        try {
            if (req.files) {
                const imagesTitles = []
                const title = req.params.acomodationName
                const images = req.files
                const acomodation = await Acomodation.findOne({ where: { title } })

                if (acomodation) {
                    images.map(img => {
                        imagesTitles.push(img.filename)
                    })

                    acomodation.images = imagesTitles.toString()
                    await acomodation.save()
                    return res.status(201).json({
                        erro: false,
                        msg: "Acomodation images saved with success!"
                    })
                }
            }

        } catch (error) {
            return res.status(400).json(error)
        }
    },

    async update(req, res) {
        try {
            const id = req.params.id

            const acomodation = await Acomodation.findOne({ where: { id } })
            if (!acomodation) {
                return res.status(400).json("Acomodation not found!")
            }
            else {
                acomodation.bedroomsQuant = req.body.bedroomsQuant
                acomodation.bedsQuant = req.body.bedsQuant
                acomodation.bethroomsQuant = req.body.bethroomsQuant
                acomodation.confort = req.body.confort.toString()
                acomodation.hostDesc = req.body.hostDesc
                acomodation.hostEmphasis = req.body.hostEmphasis
                acomodation.hostLocalization = req.body.hostLocalization
                acomodation.hostName = req.body.hostName
                acomodation.hostOptions = req.body.hostOptions.toString()
                acomodation.hostPlace = req.body.hostPlace
                acomodation.hostSpace = req.body.hostSpace
                acomodation.hostSpaceDesc = req.body.hostSpaceDesc
                acomodation.hostsQuant = req.body.hostsQuant
                acomodation.preferences = req.body.preferences.toString()
                acomodation.price = req.body.price
                acomodation.securityItems = req.body.securityItems.toString()
                acomodation.title = req.body.title

                await acomodation.save()

                return res.status(201).json({
                    erro: false,
                    msg: "Acomodation updated!"
                })
            }
        } catch (error) {
            res.status(400).send(error)
        }
    },
    async delete(req, res) {
        try {
            const id = req.params.id
            const acomodation = await Acomodation.findOne({ where: { id } })

            if (!acomodation) {
                return res.status(400).json("Acomodation not found!")
            }
            
            acomodation.images.split(",").map(image => {
                fs.unlink(`./src/images/acomodations/${image}`, (error) => {
                    if (error) {
                        console.log("Error:" + error.message)
                    }
                })
            })

            await acomodation.destroy()
            await acomodation.save()
            
            return res.status(201).json({
                erro: false,
                msg: "Acomodation removed!"
            })

        } catch (error) {
            res.status(400).send(error)
        }
    }
}