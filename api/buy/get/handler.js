const Transaction = require('../../models/transaction')
const TransactionStatus = require('../../models/transactionStatus')

const HTTP_STATUS_NOT_FOUND = 404

async function handler (request, h) {
  const input = request.params

  const transaction = await Transaction.findOne({
    attributes: ['failDescription'],
    where: {
      id: input.transactionId
    },
    include: [
      {
        model: TransactionStatus,
        attributes: ['name']
      }
    ]
  })

  if (!transaction) {
    return h.response().code(HTTP_STATUS_NOT_FOUND)
  }

  const response = {
    status: transaction.transactionStatus.name
  }

  if (transaction.failDescription) {
    response.description = transaction.failDescription
  }

  return h.response(response)
}

module.exports = handler
