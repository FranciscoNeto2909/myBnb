const { hash, compare } = require("bcryptjs")
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
                }
                
                acomodation.images = imagesTitles.toString()
                await acomodation.save()
                return res.status(201).json({
                    erro: false,
                    msg: "Acomodation images saved with success!"
                })
            }

        } catch (error) {
            return res.status(400).json(error)
        }
    },

    async update(req, res) {
        try {
            const { name, price, description, shifts, place, image, likes } = req.body
            const id = req.params.id

            const acomodation = await Acomodation.findOne({ where: { id } })
            if (!acomodation) {
                return res.status(400).json("Acomodation not found!")
            }
            if (name !== undefined) acomodation.name = name
            if (price !== undefined) acomodation.price = price
            if (description !== undefined) acomodation.description = description
            if (shifts !== undefined) acomodation.shifts = shifts
            if (place !== undefined) acomodation.place = place
            if (image !== undefined) acomodation.image = image
            if (likes !== undefined) acomodation.likes = likes

            await acomodation.save()
            res.status(201).json({
                erro: false,
                msg: "Acomodation updated!"
            })
        } catch (error) {
            res.status(400).send(error)
        }
    },
    async delete(req, res) {
        try {
            const id = req.params.id
            const acomodation = await Acomodation.destroy({ where: { id } })

            if (!acomodation) {
                return res.status(400).json("Acomodation not found!")
            }
            res.status(201).json("Acomodation removed!")

        } catch (error) {
            res.status(400).send(error)
        }
    }
}