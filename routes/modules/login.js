const express = require('express')
const router = express.Router()
const verifyAccount = require('../../utils/verification')
router.get('/', (req, res) => {
  res.render('index')
})

router.post('/verification', (req, res) => {
  const accountData = req.body
  const email = req.body.email
  const token = { email }
  let msg = ''
  const verifyToken = verifyAccount(accountData)
  switch (verifyToken) {
    case 'noEmailInDB':
      token.msg = 'Email does not exist in database'
      res.render('index', { token })
      break;
    case 'incorrectPassword':
      token.msg = 'Password is incorrect'
      res.render('index', { token })
      break;
    default:
      token.firstName = verifyToken.firstName
      res.render('success', { token })
  }
})

module.exports = router