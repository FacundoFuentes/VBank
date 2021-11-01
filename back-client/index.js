
require('./src/db.js')
const express = require('express')
const morgan = require('morgan');
const router = require('./src/routes/index')
const cors = require('cors');


app = express()

const port = process.env.PORT || 3001


app.use(express.json())
app.use(cors())
app.use(morgan('dev'));

app.use('/', router);






app.listen(port, () => {
    console.log('aguante diseño grafico')
})



