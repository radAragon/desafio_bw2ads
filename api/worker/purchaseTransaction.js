const Transaction = require('../models/transaction')
const db = require('../db')
const { validateTicket, postTicket } = require('./ticketControl')
const { postValue } = require('./valueControl')

const IN_PROCESS = 2
const SUCCESS = 3
const FAIL = 4

async function purchaseTransaction (content) {
  try {
    const purchaseTransaction = await Transaction.findOne({
      where: {
        id: parseInt(content)
      }
    })

    if (!purchaseTransaction) throw new Error('Purchase Transaction not found!')

    if ([SUCCESS, FAIL].includes(purchaseTransaction.idTransactionStatus)) {
      return // Already done
    }

    await purchaseTransaction.setTransactionStatus(IN_PROCESS)

    if (await validateTicket(purchaseTransaction.idTicket, purchaseTransaction.idShow)) {
      await postTicket(purchaseTransaction.idTicket, purchaseTransaction.idShow)
      await postValue(purchaseTransaction.idShow, purchaseTransaction.value)
      await purchaseTransaction.setTransactionStatus(SUCCESS)
    }
  } catch (err) {
    console.log('Purchase Transaction fail:', err.message)
    throw err
  }
}

module.exports = purchaseTransaction
