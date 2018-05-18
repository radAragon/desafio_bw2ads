const queue = require('../amqp')
const purchaseTransaction = require('./purchaseTransaction')

let consumerTag

const waitDelay = async () => await (new Promise(resolve => setTimeout(resolve, 5000)))

async function worker (message) {
  try {
    const content = message.content.toString()
    await purchaseTransaction(content)
    return queue.ack(message)
  } catch (err) {
    console.log('Transaction back to queue')
    await waitDelay()
    return queue.nack(message)
  }
}

async function consumerDaemon (server) {
  let response

  while (server.info.started) {
    try {
      response = await queue.consume(worker)
      break
    } catch (err) {
      await waitDelay()
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
