const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Videogame', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: true,
      defaultValue: DataTypes.UUIDV4,
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
      type: DataTypes.FLOAT,
      allowNull: false,
    }
  });
};
