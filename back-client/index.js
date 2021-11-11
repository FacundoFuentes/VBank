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
        next()
    } catch (error) {
        res.status(401).json({status: 'failed', data: 'Unauthorized', error: error.message})
    }
  }
verifyToken.unless = unless

app.use(cors())
app.use(express.json())
app.use(morgan('dev'));
app.use(passport.initialize())
app.use(verifyToken.unless({path: ['/','/user/login', '/user/register', '/clearDb/full']}))
//Hay que mandar el token desde el front
//Si el token es invalido, redirect a http://localhost:3000


app.use('/', router);






app.listen(port, () => {
    console.log('aguante diseño grafico')
})



