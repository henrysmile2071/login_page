const express = require('express')
const port = 3000
const app = express()
const exphdb = require('express-handlebars')
const routes = require('./routes')
const session = require('express-session')

// view engine
app.engine('hbs', exphdb.engine({ extname: '.hbs' }))
app.set('view engine', 'hbs')

// middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(session({
  name: 'user',
  secret: "mySecret",
  saveUninitialized: false,
  resave: true,
}))

app.use(routes)

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})
