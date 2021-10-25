
const express = require('express')
require('./src/db.js')


app = express()

const port = process.env.PORT || 3000


app.use(express.json())


app.listen(port, () => {
    console.log('aguante diseño grafico')
})
