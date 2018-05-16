const hapi = require('hapi')
const buyticket = require('./buyticket')

const PORT = 3000

const server = hapi.server({
  port: PORT,
  host: 'localhost',
  debug: {
    request: '*'
  }
})

server.route(buyticket)

server.route({
  path: '/health',
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
