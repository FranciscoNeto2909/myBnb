const Acomodation = require("../models/acomodation")
const fs = require("fs")

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
            const { hostLocalization, title } = data
            const acomodation = await Acomodation.findOne({ where: { hostLocalization, title } })

            if (acomodation) {
                return res.status(400).json("Erro: acomodations alredy exist!")
            } else {
                await Acomodation.create(data)
                const newAcomodation = await Acomodation.findOne({ where: { hostLocalization, title } })

                res.status(201).json({
                    erro: false,
                    msg: "Acomodation registered successfully!",
                    id: newAcomodation.id
                })
            }
        } catch (error) {
            res.status(400).json("faltam dados" + error)
        }
    },

    async setImages(req, res) {
        try {
            const id = req.params.id
            const images = req.files

            let imagesTitles = []

            const acomodation = await Acomodation.findOne({ where: { id } })

            if (!acomodation) {
                return res.status(400).json("Erro: Acomodation not found!")
            }
            if (acomodation.images != null && acomodation.images.length > 5) {
                try {
                    const imgsArr = acomodation.images.split(",")
                    const index = imgsArr.indexOf(req.body.oldImage)
                    const newImg = req.files[0].filename
                    imgsArr.splice(index, 1, newImg)
                    console.log(index)
                    fs.unlink(`./src/images/acomodations/${req.body.oldImage}`, (error) => {
                        if (error) {
                            console.log("Error:" + error.message)
                        }
                    });

                    acomodation.images = imgsArr.toString()
                    await acomodation.save()

                    return res.status(200).json({
                        error: false,
                        msg: "Images uploaded with success!"
                    })
                } catch (error) {
                    return res.status(400).json({
                        error: true,
                        msg: "Images update error!"
                    })
                }
            } else if (acomodation.images == null && req.files) {
                try {
                    await images.map(img => {
                        imagesTitles.push(img.filename)
                    })

                    acomodation.images = imagesTitles.toString()
                    await acomodation.save()

                    return res.status(200).json({
                        error: false,
                        msg: "Images uploaded with success!"
                    })
                } catch (error) {
                    return res.status(400).json({
                        error: true,
                        msg: "Images upload error!"
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

            if (acomodation.images) {
                acomodation.images.split(",").map( img =>
                    fs.unlink(`./src/images/acomodations/${img}`, (error) => {
                        if (error) {
                            console.log("Error:" + error.message)
                        }
                    })
                )
            }

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