require('dotenv').config()

const Backend = require('like-backend')
const express = require('like-express')
const ErrorHTTP = require('tiny-error-http')

module.exports = Backend.launch(main)

async function main () {
  const app = express()

  app.use(function (req, res, next) {
    // Pass state here like req.db = db
    next()
  })

  const api = express.Router()

  api.post('/example', require('./api/example.js'))

  app.use('/v1', api)
  app.use(ErrorHTTP.middleware)

  return new Backend({
    app,
    goodbye: async function () {
      // Close resources here
    }
  })
}
