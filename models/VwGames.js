const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const VwGame = sequelize.define('VwGame', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  total_point: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  tableName: 'vw_games',
  timestamps: false,
  freezeTableName: true
});

module.exports = VwGame;
