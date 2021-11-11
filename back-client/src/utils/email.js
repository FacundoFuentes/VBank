const  nodemailer = require('nodemailer')
// const hbs = require('nodemailer-express-handlebars');
const utils = require('../utils/utils')



const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // security for port 465 ( gmail host)
    auth: {
        user:'servinchristianmanuel@gmail.com', // generated google user
        pass: 'hugownzaqtznmliw' // generated google password
    }
})


// transporter.use('compile', hbs({
//     viewEngine: 'express-handlebars',
//     viewPath: './views/',
    
// }));


// C:\Users\usuario\Desktop\VBank\back-client\src\utils\views

transporter.verify().then(() => {
    console.log('Ready for send emails')
})



const email = async (code,cvu,cardNumber,cvv,email) => {
    const mail = await transporter.sendMail({
        from: "servinchristianmanuel@gmail.com",
        to: email, // recuperar desde user
        subject: "Verification Email",
        // template: 'verification',
        // context: {
        //     code: code
        // }
        html:`
            <h1> Welcome to VBank !! </h1>
            <p>CVU:${cvu}</p>
            <h2>Datos de la Tarjeta </h2>
            <p>**** **** **** ${cardNumber.slice(-4)}</p>
            <p>codigo de seguridad:${utils.decrypt(cvv)}</p>`
    }, function (err, info){
        if (err){
            res.json(err)
        }
        else {
            res.json(info)
        }
    })
    
    return mail
} 





module.exports = {
    email,
    transporter,
}



// cmtrmsxgtvnghjcu



// Name	Yasmeen Cormier
// Username	wixpkil7cvo2qi7s@ethereal.email (also works as a real inbound email address)
// Password	sBVdTwqcWNQDqHdKZp