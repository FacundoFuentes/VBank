require('./src/db.js')
const {ExtractJwt} = require('passport-jwt')
const express = require('express')
const unless = require('express-unless');
const morgan = require('morgan');
const router = require('./src/routes/index')
const cors = require('cors');
const passport = require('passport');
const jwt = require('jsonwebtoken')
require("dotenv").config();


app = express()

const port = process.env.PORT || 3001

const verifyToken = (req, res, next) =>{
    const authToken = ExtractJwt.fromAuthHeaderAsBearerToken()(req)

    try {
        jwt.verify(authToken, process.env.JWT_SECRET)
        res.redirect('http://localhost:3001/user/login')
        next()
    } catch (error) {
        res.status(400).json({status: 'failed', data: error})
    }
  }
verifyToken.unless = unless

app.use(cors())
app.use(express.json())
app.use(morgan('dev'));
app.use(passport.initialize())
app.use(verifyToken.unless({path: ['/','/user/login', '/user/register', '/clearDb/full']}))


app.use('/', router);






app.listen(port, () => {
    console.log('aguante diseño grafico')
})



