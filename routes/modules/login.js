const express = require('express')
const router = express.Router()
const verifyAccount = require('../../utils/verification')

router.get('/', (req, res) => {
  console.log(`session is ${req.session}`)
  console.log(`sessionid is ${req.sessionID}`)
  if (req.session.user) {
    return res.redirect('/success')
  }
  res.render('index')
})

router.post('/verification', (req, res) => {
  const accountData = req.body
  const email = req.body.email
  const token = { email }
  const verifyToken = verifyAccount(accountData)
  console.log(verifyToken)
  switch (verifyToken) {
    case 'noEmailInDB':
      res.render('index', { alert: 'Email does not exist in database' })
      break;
    case 'incorrectPassword':
      res.render('index', { alert: 'Password is incorrect' })
      break;
    default:
      req.session.user = verifyToken.firstName
      return res.redirect('/success')
  }
})

router.get('/success', auth, (req, res) => {
  const userName = req.session.user
  return res.render('success', { message: `Welcome back, ${userName}!` })
})

router.get('/logout', auth, (req, res) => {
  req.session.destroy(() => {
    console.log('session destroyed')
  })
  res.render('index', { alert: 'You are logged out! Enter credentials to login again!' })
})

function auth(req, res, next) {
  if (req.session.user) {
    console.log('authenticated')
    next()
  } else {
    console.log('not authenticated')
    return res.redirect('/')
  }
  next()
}

module.exports = router