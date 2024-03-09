const yup = require('yup')
const ErrorHTTP = require('tiny-error-http')

const schema = yup.object().shape({
  email: yup.string().default('').transform(v => v.replace(/\s/g, '').toLowerCase()).min(1).max(255).test(v => v.match(/^(.+)@(.+)\.(.+)$/i)),
  password: yup.string().default('').min(1).max(255),
  repassword: yup.string().default('').oneOf([yup.ref('password')])
})

/* const anotherSchema = yup.object().shape({
  userAddress: yup.string().default('').min(1).max(128).transform(v => v.toLowerCase()).test(v => web3.isAddress(v)),
  amount: yup.number().default(0.0).min(0.00000001),
  coin: yup.string().default('').min(1).max(16).transform(v => v.toUpperCase()).oneOf(['USDT', 'BUSD'])
}) */

module.exports = async function (req, res) {
  if (req.cookies.auth) throw new ErrorHTTP(403, 'ALREADY_LOGGED_IN')

  const body = await schema.validate(req.body)

  try {
    // For example, register an user
    console.log(body)
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') throw new ErrorHTTP(409, 'ALREADY_REGISTERED')
  }

  res.status(200).json({ ok: true })
}
