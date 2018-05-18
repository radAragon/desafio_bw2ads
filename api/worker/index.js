const queue = require('../amqp')
const purchaseTransaction = require('./purchaseTransaction')

let consumerTag

async function worker (message) {
  const content = message.content.toString()

  await purchaseTransaction(content)

  return queue.ack(message)
}

async function consumerDaemon (server) {
  let response

  while (server.info.started) {
    try {
      response = await queue.consume(worker)
      break
    } catch (err) {
      await (new Promise(resolve => setTimeout(resolve, 5000)))
    }
  }

  if (!response) {
    throw new Error('Closed queue!')
  }

  consumerTag = response.consumerTag
  console.log('Queue consumer tag:', consumerTag)
}

module.exports = {
  consumerDaemon
}
