const { Sequelize } = require('sequelize')
const fs = require('fs')
const path = require('path')
require('dotenv').config()
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME, DB_DIALECT } = process.env

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: DB_DIALECT,
  dialectModule: require('mysql2'),
  dialectOptions: {
      ssl: {
        ca: fs.readFileSync(path.join(__dirname, '..', 'cert.pem'))
      }
  },
  pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
})

module.exports = sequelize
