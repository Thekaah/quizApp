const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');

const Feedback = sequelize.define('Feedback', {
  score: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Remova a chamada `sequelize.sync();` daqui

module.exports = Feedback;
