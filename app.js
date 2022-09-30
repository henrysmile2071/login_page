const express = require('express')
const port = 3000
const app = express()
const exphdb = require('express-handlebars')
const routes = require('./routes')
app.use(express.static('public'))
app.engine('hbs', exphdb.engine({ extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))
app.use(routes)

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})
