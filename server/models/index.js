const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('aksharacms' , 'root', 'pass@123', {
    host: 'localhost',
    dialect: 'mysql'
})


  module.exports = sequelize;