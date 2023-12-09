const test = require('brittle')
const launch = require('../app.js')
const { request } = require('./helpers')

test('basic', async function (t) {
  const backend = await launch(t)

  const response = await request(backend, '/api/example', {
    method: 'POST',
    body: {
      email: 'test@example.com',
      password: '1234',
      repassword: '1234'
    }
  })

  t.alike(response, { ok: true })
})
