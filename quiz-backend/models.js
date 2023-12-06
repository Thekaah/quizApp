const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');

const Feedback = sequelize.define('Feedback', {
  score: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Feedback.belongsTo(User); // Adiciona uma relação entre Feedback e User

module.exports = { Feedback, User };
