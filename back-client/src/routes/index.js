const { Router } = require('express');
const UserRoute = require('./UserRoute')
const TransactionRoute = require('./TransactionRoute')
const utils = require('./Utils.js')
const statistics = require('./Statistics.js')


const router = Router()

router.use('/user', UserRoute)
router.use('/statistics', statistics)
router.use('/transactions', TransactionRoute)
router.use('/clearDB', utils)

module.exports = router;