const Sequelize = require('sequelize')
const db = require('../db')

const PurchaseStatus = db.define('purchaseStatus', {
  name: Sequelize.STRING
}, {
  freezeTableName: true
})

module.exports = () => PurchaseStatus
