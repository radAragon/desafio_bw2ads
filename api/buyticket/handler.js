const Purchase = require('../models/purchase')

async function handler (request, h) {
  console.log('oi handler', request.payload)

  const purchases = await Purchase().findAll()

  return purchases
}

module.exports = handler
