const got = require('got')
const Transaction = require('../models/transaction')
const db = require('../db')

async function purchaseTransaction (content) {
  await db.transaction(async (t) => {
    const purchaseTransaction = await Transaction.findOne({
      where: {
        id: parseInt(content)
      }
    }, {
      transaction: t
    })

    if (!purchaseTransaction) throw new Error('Transaction not found!')

    
  })
}

module.exports = purchaseTransaction
