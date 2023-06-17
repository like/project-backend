const yup = require('yup')
const reduceUA = require('reduce-user-agent')

const schema = yup.object() // You should set a more strict structure

module.exports = async function (req, res) {
  const body = await schema.validate(req.body)
  const params = JSON.parse(body.params)

  console.log(
    '- Pixel:',
    '[' + (new Date().toLocaleString('en-GB')) + ']',
    '[' + (req.headers['cf-connecting-ip'] || req.ip), (req.headers['cf-ipcountry'] || null) + ']',
    // req.headers,
    '[' + req.method, req.url + ']',
    ...params,
    reduceUA(req.headers['user-agent'])
  )

  res.status(200).json({})
}
