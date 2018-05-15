const hapi = require('hapi')
const buyticket = require('./buyticket')

const server = hapi.server({
  port: 3001,
  host: 'localhost'
})

server.route(buyticket)

async function init () {
  await server.start()
  console.log('desafio api is listening on port 3001!')
}

process.on('unhandledRejection', (err) => {
  console.log('API error:', err)
  process.exit(1)
})

init()
