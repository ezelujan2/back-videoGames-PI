const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Videogame', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description:{
      type: DataTypes.STRING,
      allowNull : false
    },
    platform : {
      type:  DataTypes.ARRAY(DataTypes.JSON),
      allowNull: false,
    },
    background_image : {
      type: DataTypes.STRING,
      allowNull: true,
    },
    released : {
      type: DataTypes.STRING,
      allowNull: false
    },
    rating : {
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  });
};
