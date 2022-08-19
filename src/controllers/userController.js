const User = require("../models/user")

module.exports = {
    async all(req, res) {
        try {
            const users = await User.findAll()
            res.status(200).json(users)
        } catch (error) {
            res.status(400).send(error)
        }
    },
    async one(req, res) {
        try {
            const id = req.param.id
            const user = await User.findOne({ where: id })

            if (!user) {
                return res.status(400).json("User not found!")
            }
            res.status(200).json(user)
        } catch (error) {
            res.status(400).send(error)
        }
    }
    ,
    async create(req, res) {
        try {
            await User.create(req.body)
            res.status(200).json("user registered successfully!")
        } catch (error) {
            res.status(400).send(error)
        }
    },
    async update(req, res) {
        try {
            const { name, userKey } = req.body
            const id = req.param.id

            const user = await User.findOne({ where:{ id }})

            if (!user) {
                return res.status(400).json("User not found!")
            }

            user.name = name
            user.userKey = userKey

            await user.save()
            res.status(201).json("User updated!")
        } catch (error) {
            res.status(400).send(error)
        }
    },
    async delete(req, res) {
        try {
            const id = req.param.id
            const user = await User.destroy({ where: { id } })

            if (!user) {
                return res.status(400).json("User not found!")
            }
            res.status(201).json("User removed!")
            
        } catch (error) {
            res.status(400).send(error)
        }
    }
}