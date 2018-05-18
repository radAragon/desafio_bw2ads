module.exports = {
  db: {
    dialect: 'mysql',
    database: process.env.DB_NAME || 'b2wadds',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 3306,
    username: process.env.DB_USER || 'desafio',
    password: process.env.DB_PASS || 'mudar123'
  },

  queue: {
    protocol: 'amqp',
    hostname: process.env.RABBITMQ_HOST || 'localhost',
    port: parseInt(process.env.RABBITMQ_PORT) || 5672,
    username: process.env.RABBITMQ_USER || 'desafio',
    password: process.env.RABBITMQ_PASS || 'mudar123',
    name: process.env.RABBITMQ_QUEUE || 'fila1'
  },

  ticketControlEndpoint: {
    hostname: process.env.TICKET_CONTROL_HOST || 'localhost',
    port: parseInt(process.env.TICKET_CONTROL_PORT) || 3002,
    path: '/api/v1/tickets'
  },

  valueControleEndpoint: {
    hostname: process.env.VALUE_CONTROL_HOST || 'localhost',
    port: parseInt(process.env.VALUE_CONTROL_PORT) || 3003,
    path: '/api/v1/valores'
  }

}

console.log('Setup:')
console.log(module.exports)
