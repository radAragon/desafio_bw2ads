const amqp = require('amqplib')
const config = require('../config')

let channel

async function getChannel() {
  if (!channel) {
    const conn = await amqp.connect(config.queue)
    channel = await conn.createChannel()
    await channel.assertQueue(config.queue.name)
  }
  return channel
}

async function send (content) {
  await getChannel()
  return channel.sendToQueue(config.queue.name, Buffer.from(`${content}`))
}

async function consume (worker) {
  await getChannel()
  return channel.consume(config.queue.name, worker)
}

function ack (message) {
  return channel.ack(message)
}

module.exports = {
  send,
  consume,
  ack
}
