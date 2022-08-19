const Sequelize = require("sequelize")
const database = require("../configs/db")

const User = database.define("user",{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    name: {
        type: Sequelize.STRING(50),
        allowNull:false
    },
    userKey:{
        type: Sequelize.DECIMAL,
        allowNull:false
    }
})

module.exports = User