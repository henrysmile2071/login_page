const express = require('express')
const router = express.Router()
const login = require('./modules/login')
router.use('/', login)
router.use('/verification', login)

module.exports = router