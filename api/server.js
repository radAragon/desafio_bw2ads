const hapi = require('hapi')
const buy = require('./buy')

const PORT = 3000

const server = hapi.server({
  port: PORT,
  debug: {
    request: ['error']
  }
})

server.route(buy.post)
server.route(buy.get)

server.route({
  path: '/',
  method: 'GET',
  handler: () => 'alive'
})

async function init () {
  await server.start()
  console.log(`desafio api is listening on port ${PORT}!`)
}

process.on('unhandledRejection', (err) => {
  console.log('API error:', err)
  process.exit(1)
})

init()
