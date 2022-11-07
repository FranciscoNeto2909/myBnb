const { compare } = require("bcryptjs")
const User = require("../models/user")
const jwt = require("jsonwebtoken")
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
            const email = req.param.id
            const user = await User.findOne({ where: { email } })

            if (!user) {
                return res.status(400).json("Erro: user not found!")
            }
            res.status(200).json(user)
        } catch (error) {
            res.status(400).send(error)
        }
    },

    async logedUsers(req, res) {
        try {
            return res.status(200).json({
                msg: "List users",
                id_user_loged: req.userId
            })
        } catch (error) {
            return res.status(400).send(error)
        }
    },

    async create(req, res) {
        try {
            const dados = req.body
            const email = req.body.email
            const userExist = await User.findOne({ where: { email } })
            console.log(req.body)
            if (userExist) {
                return res.status(400).json("Erro: user alredy existe, please choice another email!")
            }

            await User.create(dados)
            return res.status(200).json("Registered user successfully!")
        } catch (error) {
            return res.status(400).send(error)
        }
    },

    async update(req, res) {
        try {
            const { name, email, password, phone, birthdate, sex, address } = req.body
            const id = req.params.id

            const user = await User.findOne({ where: { id } })

            if (!user) {
                return res.status(400).json("Erro: user not found!")
            }

            user.name = name
            user.email = email
            user.password = password
            user.phone = phone
            user.birthDate = birthdate
            user.sex = sex
            user.address = address
            await user.save()

            res.status(201).json("User updated!")
        } catch (error) {
            res.status(400).send(error)
        }
    },

    async login(req, res) {

        const { email, password } = req.body

        const user = await User.findOne({ where: { email } })

        if (user === null) {
            return res.status(400).json({
                error: true,
                msg: "Incorrect email or password!"
            })
        }
        if (!(await compare(password, user.password))) {
            return res.status(400).json({
                error: true,
                msg: "Incorrect email or password!"
            })
        } else {

            const token = jwt.sign({ id: user.id }, "a92nfj40d92ny645lf2s03md9n2g", {
                expiresIn: '7d'
            })

            return res.status(200).json({
                error:false,
                msg: "User login successfully!",
                token: token,
                user: user
            })
        }
    },
    async delete(req, res) {
        try {
            const id = req.params.id
            const user = await User.destroy({ where: { id } })
            console.log(user)
            if (!user) {
                return res.status(400).json("Erro: user not found!")
            }
            res.status(201).json("User removed!")

        } catch (error) {
            res.status(400).send(error)
        }
    }
}