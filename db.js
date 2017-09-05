//connect Database
const mysql = require("mysql");
const Sequelize = require('sequelize');

const sequelize = new Sequelize('gallery', 'root', 'root', {
    host: 'localhost',
    port: 8889,
    dialect: 'mysql'
});

sequelize.authenticate().complete(function (err) {
 if (err) {
    console.log('There is connection in ERROR');
 } else {
    console.log('Connection has been established successfully');
 }
});

module.exports = sequelize