const express = require('express')
const router = express.Router()
const login = require('./modules/login')

router.use('/', login)
router.use('/verification', login)
router.use('/logout', login)
router.use('/success', login)

module.exports = router