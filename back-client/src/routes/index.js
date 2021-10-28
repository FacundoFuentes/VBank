const { Router } = require('express');
const UserRoute = require('./UserRoute')
const TransactionRoute = require('./TransactionRoute')
const utils = require('./Utils.js')
const stadistics = require('./Stadistics.js')


const router = Router()

router.use('/user', UserRoute)
router.use('/stadistics', stadistics)
router.use('/transactions', TransactionRoute)
router.use('/clearDB', utils)

module.exports = router;