const { DataTypes } = require("sequelize");

const seq = require("./index");

const Contents = seq.define("Contents", {
  id: {
    type: DataTypes.INTEGER,

    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  uid: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Contents;
