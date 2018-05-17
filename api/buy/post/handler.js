const Transaction = require('../../models/transaction')

const HTTP_STATUS_CREATED = 201

async function handler (request, h) {
  const input = request.payload

  const newTransaction = await Transaction().create({
    buyDate: input.data_compra,
    idAccount: input.account_id,
    idTicket: input.id_ingresso,
    idShow: input.id_show,
    value: input.valor
  })

  const response = {
    transactionId: newTransaction.id
  }

  return h.response(response).code(HTTP_STATUS_CREATED)
}

module.exports = handler
