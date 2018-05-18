const got = require('got')
const { ticketControlEndpoint } = require('../config')

const NO_CONTENT = 204

async function validateTicket (idTicket, idShow) {
  const request = Object.assign({}, ticketControlEndpoint, {
    path: ticketControlEndpoint.path + `/validate?id_ingresso=${idTicket}&id_show=${idShow}`,
    method: 'GET'
  })

  const response = await got(request, {
    json: true
  })

  return response.body.valid
}

async function postTicket (idTicket, idShow) {
  const request = Object.assign({}, ticketControlEndpoint, {
    method: 'POST'
  })

  const response = await got(request, {
    json: true,
    body: {
      'id_ingresso': idTicket,
      'id_show': idShow
    }
  })

  if (response.statusCode !== NO_CONTENT) {
    throw new Error('Post Ticket failed')
  }

  console.log('post ticket success')
}

module.exports = {
  validateTicket,
  postTicket
}
