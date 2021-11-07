const mongoose = require("mongoose");



mongoose.connect(process.env.MONGODB_URI ||
    "mongodb+srv://backend:tejVmxUmY3InsvFY@cluster0.omulp.mongodb.net/VBank?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
    ).then(() => {
        console.log('DB Connection Succesfull')
    }).catch( e => {
        console.log(e)
    });
    
    

