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
            const acomodation = await Acomodation.findOne({ where: {id} })
            if (!acomodation) {
                return res.status(400).json("Acomodation not found!")
            }
            res.status(200).json(acomodation)
        } catch (error) {
            res.status(400).send(error)
        }
    }
    ,
    async create(req, res) {
        try {
            const data = req.body
            const { localization } = data
            const acomodation = await Acomodation.findOne({ where: { localization } })

            if (acomodation) {
                return res.status(400).json("Erro: acomodations alredy exist!")
            }
            await Acomodation.create(data)
            res.status(201).json("Acomodation registered successfully!")
        } catch (error) {
            res.status(400).send(error)
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
            res.status(201).json("Acomodation updated!")
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