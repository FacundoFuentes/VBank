const  nodemailer = require('nodemailer')
// const hbs = require('nodemailer-express-handlebars');




const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // security for port 465 ( gmail host)
    auth: {
        user:'wixpkil7cvo2qi7s@ethereal.email', // generated google user
        pass: 'sBVdTwqcWNQDqHdKZp' // generated google password
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



const email = async (code,cvu,cardNumber,cvv) => {
    const mail = await transporter.sendMail({
        from: "Remitente",
        to: "simoncito@hotmail.com", // recuperar desde user
        subject: "Verification Email",
        // template: 'verification',
        // context: {
        //     code: code
        // }
        html:`
            <h1> Welcome to VBank !! </h1>
            <p>Codigo de verificacion:${code}</p>
            <p>CVU:${cvu}</p>
            <h2>Datos de la Tarjeta </h2>
            <p>${cardNumber}</p>
            <p>codigo de seguridad:${cvv}</p>`
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