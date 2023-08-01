const {DataTypes} = require("sequelize")

module.exports =  (sequelize) => {
    sequelize.define('Genre', {
        id : {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoincrement: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })
}
