async function handler (request, h) {
  console.log('oi handler', request.payload)
  return '{}'
}

module.exports = handler
