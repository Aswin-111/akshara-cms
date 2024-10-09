const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE ,process.env.USERNAME,process.env.PASS, {
    host: process.env.HOST,
    dialect: process.env.DIALECT
})


  module.exports = sequelize;