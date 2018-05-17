const Sequelize = require('sequelize')
const db = require('../db')
const TransactionStatus = require('./transactionStatus')

const Transaction = db.define('transaction', {
  idTransactionStatus: Sequelize.INTEGER,
  buyDate: Sequelize.DATE,
  idAccount: Sequelize.INTEGER,
  idTicket: Sequelize.INTEGER,
  idShow: Sequelize.INTEGER,
  value: Sequelize.FLOAT,
  failDescription: Sequelize.STRING
})

Transaction.belongsTo(TransactionStatus, {
  foreignKey: 'idTransactionStatus'
})

module.exports = Transaction
