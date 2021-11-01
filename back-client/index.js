
require('./src/db.js')
const express = require('express')
const morgan = require('morgan');
const router = require('./src/routes/index')
const cors = require('cors');
const passport = require('passport');


app = express()

const port = process.env.PORT || 3001


app.use(cors())
app.use(express.json())
app.use(morgan('dev'));
app.use(passport.initialize())

app.use('/', router);






app.listen(port, () => {
    console.log('aguante diseño grafico')
})



