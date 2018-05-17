const queue = require('../amqp')
const purchaseTransaction = require('./purchaseTransaction')

let consumerTag

async function worker (message) {
  const content = message.content.toString()

  await purchaseTransaction(content)

  return queue.ack(message)
}

async function consumerDaemon (server) {
  const response = await queue.consume(worker)

  if (!response) {
    throw new Error('Closed queue!')
  }

  consumerTag = response.consumerTag
}

module.exports = {
  consumerDaemon
}
