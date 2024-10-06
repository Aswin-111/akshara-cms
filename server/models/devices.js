const { Datatypes, DataTypes } = require("sequelize");

const seq = require("./index");

const Devices = seq.define("devices", {
  id: {
    type: DataTypes.INTEGER,

    primaryKey: true,
    autoIncrement: true,
  },
  
  link : {
    type: DataTypes.INTEGER,


  },
  device: {
    type: DataTypes.STRING,

    allowNull: false,
  },

  ip: {
    type: DataTypes.STRING,

    allowNull: false,
  },

  topics: {
    type: DataTypes.JSON,
  },

  assigned: {
    type: DataTypes.BOOLEAN,
    defaultValue : false,
  },
  

  
  
  
  assigned_id: {
    type: DataTypes.STRING,
  },




});

module.exports = Devices;
