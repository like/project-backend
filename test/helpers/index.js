const fetch = require('like-fetch')

module.exports = {
  request
}

function request (backend, endpoint, opts = {}) {
  return fetch('http://127.0.0.1:' + backend.port + endpoint, {
    method: opts.method || 'GET',
    requestType: opts.requestType || 'json',
    responseType: opts.responseType || 'json',
    body: opts.body
  })
}
