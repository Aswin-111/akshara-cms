
const { DataTypes } = require("sequelize");
const seq = require("./index");

const Gallery = seq.define("gallery", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    
    autoIncrement: true,
  },

  gallery: {
    type: DataTypes.STRING,
    allowNull: false,
  },






  devicelist : {
    type: DataTypes.STRING,
    
  }
});

module.exports = Gallery;