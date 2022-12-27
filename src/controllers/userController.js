const { compare } = require("bcryptjs")
const User = require("../models/user")
const jwt = require("jsonwebtoken")
const fs = require("fs")

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
            const id = req.params.id
            const user = await User.findOne({ where: { id } })
            
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
            const { name, email, phone, birthDate, sex, address, oldPassword, newPassword, image } = req.body
            const id = req.params.id

            const user = await User.findOne({ where: { id } })

            if (!user) {
                return res.status(400).json("Erro: user not found!")
            }

            if (oldPassword != "" && !(await compare(oldPassword, user.password))) {
                return res.status(400).json({
                    error: true,
                    msg: "Incorrect password!"
                })
            } else if (newPassword != "") {
                user.password = newPassword
                await user.save()

                return res.status(201).json({
                    msg: "Password changed with success!",
                    error: false,
                })
            }

            name != " " ? user.name = name : "";
            image != "" ? user.image = image : "";
            email != "" ? user.email = email : "";
            phone != "" ? user.phone = phone : "";
            birthDate != "" ? user.birthDate = birthDate : "";
            sex != "" ? user.sex = sex : "";
            address != "" ? user.address = address : "";

            await user.save()

            res.status(201).json({
                msg: "User updated!",
                error: false
            })

        } catch (error) {
            res.status(400).send(error)
        }
    },

    async updateImage(req, res){
        try {
            const id = req.params.id
            const user = await User.findOne({ where: { id } })
            
            if (!user) {
                return res.status(400).json("Erro: user not found!")
            }
            if(user.image !=""){
                try {
                    fs.unlink(`./src/images/profile/${user.image}`,(error) => {
                        if(error){
                            console.log("Error:"+error.message)
                        }
                    })
                } catch (error) {
                    console.log("Error:"+error.message)
                }
            }
            if (req.file) {
                try {
                    user.image = req.file.filename
                    await user.save()
                    
                    return res.status(200).json({
                        error:false,
                        msg:"Uploaded with success!"
                    })
                } catch (error) {
                    return res.status(400).json({
                        error:true,
                        msg:"Upload error!"
                    })
                }
            }
        } catch (error) {
            return res.status(400).json(error)
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
                error: false,
                msg: "User login successfully!",
                token: token,
                userId: user.id
            })
        }
    },
    async delete(req, res) {
        try {
            const id = req.params.id
            const user = await User.findOne({ where: { id } })

            if (!user) {
                return res.status(400).json("Erro: user not found!")
            } 
            else {
                fs.unlink(`./src/images/profile/${user.image}`,(error) => {
                    if(error){
                        console.log("Error:"+error.message)
                    }
                })

                await user.destroy()
                res.status(201).json("User removed!")
            }

        } catch (error) {
            res.status(400).send(error)
        }
    }
}