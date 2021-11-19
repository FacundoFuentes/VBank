const nodemailer = require("nodemailer");
const { VerificationEmail } = require("./HTML/VerificationEmail.js");
// const hbs = require('nodemailer-express-handlebars');
const utils = require("../utils/utils");
const {PasswordReset} = require('./HTML/PasswordReset.js')

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // security for port 465 ( gmail host)
  auth: {
    user: "vbank.noreply@gmail.com", // generated google user
    pass: "gxnmuzjwpiwthobz", // generated google password
  },
});

// transporter.use('compile', hbs({
//     viewEngine: 'express-handlebars',
//     viewPath: './views/',

// }));

// C:\Users\usuario\Desktop\VBank\back-client\src\utils\views

transporter.verify().then(() => {
  console.log("Ready for send emails");
});

const email = async (username, code, cvu, cardNumber, cvv, email) => {
  const mail = await transporter.sendMail(
    {
      from: "vbank.noreply@gmail.com",
      to: email, // recuperar desde user
      subject: "Verification Email",
      // template: 'verification',
      // context: {
      //     code: code
      // }
      html: VerificationEmail(username, code, cvu, cardNumber, cvv),
    },
    function (err, info) {
      if (err) {
        res.json(err);
      } else {
        res.json(info);
      }
    }
  );

  return mail;
};

const fixedDepositEmail = async (username, amount, total, date) => {
  const mail = await transporter.sendMail(
    {
      from: "vbank.noreply@gmail.com",
      to: email, // recuperar desde user
      subject: "Fixed Deposit Profits",
      html: VerificationEmail(username, code, cvu, cardNumber, cvv),
    },
    function (err, info) {
      if (err) {
        res.json(err);
      } else {
        res.json(info);
      }
    }
  );

  return mail;
};

const chargeEmail = async (email) => {
  const mailOptions = {
    from: "vbank.noreply@gmail.com",
    to: email, // recuperar desde user
    subject: "Charge Succesfull",
    // template: 'verification',
    // context: {
    //     code: code
    // }
    html: `<img src='cid:qr'></img>`,
    attachments: [
      {
        filename: "qr.png",
        path: "./src/utils/Qerres/qr.png",
        cid: "qr", //same cid value as in the html img src
      },
    ],
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
  });
};

const passwordResetEmail = async (user, subject, link) => {
  const mail = await transporter.sendMail(
    {
      from: "vbank.noreply@gmail.com",
      to: user.email, // recuperar desde user
      subject: subject,
      html: PasswordReset(user.username, link),
    },
    function (err, info) {
      if (err) {
        res.json(err);
      } else {
        res.json(info);
      }
    }
  );

  return mail;
};

module.exports = {
  email,
  transporter,
  chargeEmail,
  passwordResetEmail,
  fixedDepositEmail
};

// cmtrmsxgtvnghjcu

// Name	Yasmeen Cormier
// Username	wixpkil7cvo2qi7s@ethereal.email (also works as a real inbound email address)
// Password	sBVdTwqcWNQDqHdKZp
