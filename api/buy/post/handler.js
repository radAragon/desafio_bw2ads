const Transaction = require('../../models/transaction')
const queue = require('../../amqp')
const db = require('../../db')

const HTTP_STATUS_CREATED = 201

async function handler (request, h) {
  const input = request.payload

  const response = {}

  await db.transaction(async (t) => {
    const newTransaction = await Transaction().create({
      buyDate: input.data_compra,
      idAccount: input.account_id,
      idTicket: input.id_ingresso,
      idShow: input.id_show,
      value: input.valor
    }, {
      transaction: t
    })

    const sent = await queue.send(newTransaction.id)

    if (!sent) {
      throw new Error('Queue is full')
    }

    response.transactionId = newTransaction.id
  })

  return h.response(response).code(HTTP_STATUS_CREATED)
}

module.exports = handler
