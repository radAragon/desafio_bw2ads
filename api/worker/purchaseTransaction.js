const Sequelize = require('sequelize')
const got = require('got')
const Transaction = require('../models/transaction')
const db = require('../db')
const config = require('../config')

const IN_PROCESS = 2
const SUCCESS = 3
const FAIL = 4

async function validateShow (idTicket, idShow) {
  const response = await got(config.ticketControlEndpoint, {
    body: JSON.stringify({
      'id_ingresso': idTicket,
      'id_show': idShow
    })
  })
}

async function purchaseTransaction (content) {
  const purchaseTransaction = await Transaction.findOne({
    where: {
      id: parseInt(content)
    }
  })

  if (!purchaseTransaction) throw new Error('Purchase Transaction not found!')

  if ([SUCCESS, FAIL].contains(purchaseTransaction.idTransactionStatus)) {
    return // Already done
  } else if (purchaseTransaction.idTransactionStatus !== IN_PROCESS) {
    await purchaseTransaction.setTransactionStatus(IN_PROCESS)
  }


}

module.exports = purchaseTransaction
