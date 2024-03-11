const test = require('brittle')
const launch = require('../app.js')

test('basic', async function (t) {
  const request = await launch(t)

  const response = await request('/v1/example', {
    method: 'POST',
    body: {
      email: 'test@example.com',
      password: '1234'
    }
  })

  t.alike(response, { id: 123, key: 'abc' })
})
