const Sequelize = require("sequelize");
const database = require("../configs/db")

const Image = database.define("image", {
    name: {
        type: Sequelize.STRING(50),
        allowNull: false,
    },
    size:{
        type: Sequelize.NUMBER,
        allowNull: false,
    },
    key:{
        type: Sequelize.STRING(50),
        allowNull: false,
    },
    URL: {
        type: Sequelize.STRING(50),
    },
});

module.exports = Image