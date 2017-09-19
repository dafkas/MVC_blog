"use strict";
//connect Database
const fs = require('fs');
const path = require('path');
const mysql = require("mysql");
const Sequelize = require('sequelize');
require('dotenv').config({path: './variables.env'});

const db = {};

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_CONNECTION
}); 

fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
     .forEach(function(file) {
        var model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;

    });
 
Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;