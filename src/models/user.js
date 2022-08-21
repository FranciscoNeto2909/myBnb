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
        type: Sequelize.STRING(8),
        allowNull:false,
        validate:{
            notEmpty:{
                msg:"Esse campo não pode ser vazio"
            },
            len:{
                args:[4,8],
                msg:"Esse campo deve ter entre 4 e 8 caracteres!"
            }
        }
    }
})

module.exports = User