const got = require('got')
const { valueControleEndpoint } = require('../config')

const NO_CONTENT = 204

async function postValue (idShow, value) {
  const request = Object.assign({}, valueControleEndpoint, {
    method: 'POST'
  })

  const response = await got(request, {
    json: true,
    body: {
      'id_show': idShow,
      'valor': value
    }
  })

  if (response.statusCode !== NO_CONTENT) {
    throw new Error('Post Value failed')
  }

  console.log('post value success')
}

module.exports = {
  postValue
}
