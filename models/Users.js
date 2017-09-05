const sequelize = require('../db.js');
const Sequelize = require('sequelize');

// const sequelize = new Sequelize('gallery', 'root', 'root');

const User = sequelize.define('user', {
  name: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  }
});

module.exports = User;
