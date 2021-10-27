const  nodemailer = require('nodemailer')



const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // security for port 465 ( gmail host)
    auth: {
        user:'wixpkil7cvo2qi7s@ethereal.email', // generated google user
        pass: 'sBVdTwqcWNQDqHdKZp' // generated google password
    }
})


transporter.verify().then(() => {
    console.log('Ready for send emails')
})



module.exports = {
    transporter
}
// cmtrmsxgtvnghjcu



// Name	Yasmeen Cormier
// Username	wixpkil7cvo2qi7s@ethereal.email (also works as a real inbound email address)
// Password	sBVdTwqcWNQDqHdKZp