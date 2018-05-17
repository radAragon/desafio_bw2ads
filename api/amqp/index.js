const amqp = require('amqplib')
const config = require('../config')

let channel

async function getChannel() {
  const conn = await amqp.connect(config.queue)
  channel = await conn.createChannel()
  await channel.assertQueue(config.queue.name)
  return channel
}

exports.send = async (content) => {
  if (!channel) {
    await getChannel()
  }

  return channel.sendToQueue(config.queue.name, Buffer.from(`${content}`))
}
