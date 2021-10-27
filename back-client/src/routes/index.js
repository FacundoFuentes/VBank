const { Router } = require('express');
const UserRoute = require('./UserRoute')
const TransactionRoute = require('./TransactionRoute')


const router = Router()

router.use('/user', UserRoute)
router.use('/transactions', TransactionRoute)


module.exports = router;