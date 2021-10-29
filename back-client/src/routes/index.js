const { Router } = require('express');
const UserRoute = require('./UserRoute')

const router = Router()

router.use('/user', UserRoute)


module.exports = router;