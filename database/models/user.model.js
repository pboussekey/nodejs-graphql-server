const Sequelize = require('sequelize');
const Model = require('./abstract_model');

const User = new Model('User', {
  username: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING
  },
});


module.exports = User;
