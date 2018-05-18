const amqp = require('amqplib')
const config = require('../config')

let channel

async function getChannel() {
  if (!channel) {
    const conn = await amqp.connect(config.queue)
    channel = await conn.createChannel()
    await channel.assertQueue(config.queue.name, {durable: true})
  }
  return channel
}

async function send (content) {
  await getChannel()
  return channel.sendToQueue(config.queue.name, Buffer.from(`${content}`), {persistent: true})
}

async function consume (worker) {
  await getChannel()
  return channel.consume(config.queue.name, worker, {noAck: false})
}

function ack (message) {
  return channel.ack(message)
}

function nack (message) {
  return channel.nack(message)
}

module.exports = {
  send,
  consume,
  ack,
  nack
}
