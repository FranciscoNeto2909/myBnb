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
        allowNull:false,
        validate:{
            notEmpty:{
                msg:"Esse campo não pode ser vazio"
            }
        }
    },
    lastName: {
        type: Sequelize.STRING(50),
        allowNull:false,
        validate:{
            notEmpty:{
                msg:"Esse campo não pode ser vazio"
            }
        }
    },
    phone:{
        type:Sequelize.STRING(15),
        allowNull:false,
        validate:{
            notEmpty:{
                msg:"Esse campo não pode ser vazio"
            }
        }
    },
    email: {
        type: Sequelize.STRING(30),
        allowNull:false,
        validate:{
            notEmpty:{
                msg:"Esse campo não pode ser vazio"
            }
        }
    },
    password:{
        type: Sequelize.STRING(),
        allowNull:false,
        validate:{
            notEmpty:{
                msg:"Esse campo não pode ser vazio"
            }
        }
    },
    birthDate:{
        type:Sequelize.STRING(10),
        allowNull: false,
        validate:{
            notEmpty:{
                msg:"Esse campo não pode ser vazio"
            }
        }
    }
})

module.exports = User