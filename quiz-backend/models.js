const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');

const Feedback = sequelize.define('Feedback', {
  score: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});


module.exports = Feedback;
