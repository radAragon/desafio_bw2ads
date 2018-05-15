const joi = require('joi')
const handler = require('./handler')

module.exports = {
  method: 'POST',
  path: '/',
  handler,
  options: {
    validate: {
      payload: {
        "data_compra" : joi.date().required(),
        "account_id": joi.number().integer().required(),
        "id_ingresso": joi.number().integer().required(),
        "id_show": joi.number().integer().required(),
        "valor": joi.number().required()
      }
    }
  }
}
