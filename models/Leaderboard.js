const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Leaderboard = sequelize.define('Leaderboard', {
  id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
  },
  nickname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  total_point: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  game_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
}, {
  tableName: 'leaderboards',
  timestamps: false,
  freezeTableName: true
});

module.exports = Leaderboard;
