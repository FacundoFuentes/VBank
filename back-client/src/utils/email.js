const  nodemailer = require('nodemailer')
// const hbs = require('nodemailer-express-handlebars');
const utils = require('../utils/utils')



const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // security for port 465 ( gmail host)
    auth: {
        user:'vbank.noreply@gmail.com', // generated google user
        pass: 'gxnmuzjwpiwthobz' // generated google password
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



const email = async (username,code,cvu,cardNumber,cvv,email) => {
    const mail = await transporter.sendMail({
        from: "vbank.noreply@gmail.com",
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
            <p>codigo de seguridad:${utils.decrypt(cvv)}</p>
            <p>codigo de verificacion: ${utils.decrypt(code)}</p>
            <h2>Verify your account </h2>
            <a>localhost:3001/user/emailVerification/${username}`

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

const chargeEmail = async (email) => {
    const mailOptions = {
        from: "vbank.noreply@gmail.com",
        to: email, // recuperar desde user
        subject: "Charge Succesfull",
        // template: 'verification',
        // context: {
        //     code: code
        // }
        html:`<img src='cid:qr'></img>`,
        attachments: [{
            filename: 'qr.png',
            path: './src/utils/Qerres/qr.png',
            cid: 'qr' //same cid value as in the html img src
        }]
    }
    transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            return console.log(error)
        }
    })
} 




module.exports = {
    email,
    transporter,
    chargeEmail
}



// cmtrmsxgtvnghjcu



// Name	Yasmeen Cormier
// Username	wixpkil7cvo2qi7s@ethereal.email (also works as a real inbound email address)
// Password	sBVdTwqcWNQDqHdKZp