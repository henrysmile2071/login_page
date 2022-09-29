const express = require('express')
const port = 3000
const app = express()
const exphdb = require('express-handlebars')
app.use(express.static('public'))
const users = [
  {
    firstName: 'Tony',
    email: 'tony@stark.com',
    password: 'iamironman'
  },
  {
    firstName: 'Steve',
    email: 'captain@hotmail.com',
    password: 'icandothisallday'
  },
  {
    firstName: 'Peter',
    email: 'peter@parker.com',
    password: 'enajyram'
  },
  {
    firstName: 'Natasha',
    email: 'natasha@gamil.com',
    password: '*parol#@$!'
  },
  {
    firstName: 'Nick',
    email: 'nick@shield.com',
    password: 'password'
  }
]
app.engine('hbs', exphdb.engine({ extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/verification', (req, res) => {
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

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})

function verifyAccount(accountData) {
  let verifyToken = ''
  const userIndex = users.findIndex(account => account.email === accountData.email)
  if (userIndex === -1) {
    verifyToken = 'noEmailInDB' //no user in database
  } else if (accountData.password === users[userIndex].password) {
    verifyToken = users[userIndex] //pass
  } else {
    verifyToken = 'incorrectPassword' //incorrect password
  }
  return verifyToken
}
