const mongoose = require("mongoose");



mongoose.connect(
    "mongodb+srv://backend:tejVmxUmY3InsvFY@cluster0.omulp.mongodb.net/VBank?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
    ).then(() => {
        console.log('DB Connection Succesfull')
    }).catch( e => {
        console.log(e)
    });
    
    

