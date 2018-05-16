const Sequelize = require('sequelize')
const db = require('../db')
const PurchaseStatus = require('./purchaseStatus')

const Purchase = db.define('purchase', {
  idPurchaseStatus: Sequelize.INTEGER,
  buyDate: Sequelize.DATE,
  idAccount: Sequelize.INTEGER,
  idTicket: Sequelize.INTEGER,
  idShow: Sequelize.INTEGER,
  value: Sequelize.FLOAT,
  failDescription: Sequelize.STRING
})

module.exports = () => {
  Purchase.belongsTo(PurchaseStatus(), {
    foreignKey: 'idPurchaseStatus'
  })

  return Purchase
}
