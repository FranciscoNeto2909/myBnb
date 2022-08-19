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
            const id = req.param.id
            const acomodation = await Acomodation.findOne({ where: id })

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
            await Acomodation.create(req.body)
            res.status(200).json("Acomodation registered successfully!")
        } catch (error) {
            res.status(400).send(error)
        }
    },
    async update(req, res) {
        try {
            const { name, price, description, shifts, place,image,likes } = req.body
            const id = req.param.id

            const acomodation = await Acomodation.findOne({ where:{ id }})

            if (!acomodation) {
                return res.status(400).json("Acomodation not found!")
            }

            acomodation.name = name
            acomodation.price = price
            acomodation.description = description
            acomodation.shifts = shifts
            acomodation.place = place
            acomodation.image = image
            acomodation.likes = likes


            await Acomodation.save()
            res.status(201).json("Acomodation updated!")
        } catch (error) {
            res.status(400).send(error)
        }
    },
    async delete(req, res) {
        try {
            const id = req.param.id
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