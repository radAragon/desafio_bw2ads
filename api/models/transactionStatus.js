const Sequelize = require('sequelize')
const db = require('../db')

const TransactionStatus = db.define('transactionStatus', {
  name: Sequelize.STRING
}, {
  freezeTableName: true
})

module.exports = () => TransactionStatus
