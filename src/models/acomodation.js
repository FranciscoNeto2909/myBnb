const Sequelize = require("sequelize")
const database = require("../configs/db")
const User = require("./user")

const Acomodation = database.define("acomodation", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    hostSpace: {
        type: Sequelize.STRING(50),
        allowNull: false,
    },
    hostSpaceDesc: {
        type: Sequelize.STRING(50),
        allowNull: false,
    },
    hostPlace: {
        type: Sequelize.STRING(50),
        allowNull: false,
    },
    hostLocalization: {
        type: Sequelize.STRING,
        alowNull: false
    },
    title: {
        type: Sequelize.STRING(50),
        allowNull: false,
    },
    price: {
        type: Sequelize.STRING,
        allowNull: false
    },
    hostsQuant: {
        type: Sequelize.NUMBER,
        allowNull: false,
    },
    bedsQuant: {
        type: Sequelize.NUMBER,
        allowNull: false,
    },
    bedroomsQuant: {
        type: Sequelize.NUMBER,
        allowNull: false,
    },
    bethroomsQuant: {
        type: Sequelize.NUMBER,
        allowNull: false,
    },
    confort: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    preferences: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    securityItems: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    hostEmphasis: {
        type: Sequelize.STRING,
        alowNull: false
    },
    hostDesc: {
        type: Sequelize.STRING,
        alowNull: false
    },
    hostOptions: {
        type: Sequelize.STRING,
        allowNull: false,
    },
})

Acomodation.belongsTo(User,{
    constraint: true,
    foreignKey:"ownerId"
})

module.exports = Acomodation  