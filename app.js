const express = require('express')
const port = 3000
const app = express()
const exphdb = require('express-handlebars')
app.engine('hbs', exphdb.engine({ extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})