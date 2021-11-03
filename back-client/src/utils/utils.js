const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const validator = require("validator");
const generator = require("generate-password");
const CryptoJS = require('crypto-js')
const pdf = require('html-pdf');
const random = require("simple-random-number-generator");


require('dotenv').config()


const signToken =(userInfo) => {
  return jwt.sign(userInfo ,process.env.JWT_SECRET, {expiresIn: '600000'});
}
const generatePDF = async (date, sender, receiver, amount) => {
  const content = `
  <!doctype html>
      <html>
         <head>
              <meta charset="utf-8">
              <title>PDF Result Template</title>
              <style>
                  .Header{
                    background-color: blue,
                    display: flex,
                    align-items: center,
                    justify-content: center
                  }
                  h1 {
                      color: green;
                  }
                  h2{
                    background-color: blue
                  }
              </style>
          </head>
          <body>
          <div className = "Header">
              <h1>Transaction</h1>
              <h3>Dear ${receiver}, you received your transaction and it is deposited into your account.
              <h4>Date: ${date.getDay()}/${date.getMonth()}/${date.getFullYear()}</h4>
          </div>
          <div className = "content">
              <p>${sender} sent ${amount}</p>
              </div>
              <h2>VBank</h2>
          </body>
      </html>
  `;


  pdf.create(content).toFile('./html-pdf.pdf', function(err, res) {
      if (err){
          console.log(err);
      } else {
          console.log(res);
      }
  });
}
const date = new Date()
generatePDF(date, 'SimonOro1', 'FacuFu1', 100)

const getToken =(userInfo) => {
    return jwt.sign(userInfo,process.env.JWT_SECRET, {expiresIn: '60000'});
}

const verifyToken=(token) => {
    return jwt.verify(token, process.env.JWT_SECRET)
}

// CALCULO CBU

// const generator = require('creditcard-generator')



const encrypt  = (param) => {
  return CryptoJS.AES.encrypt(param, process.env.SECRET_CRYPT).toString()
}

const decrypt = (param) => {
  let bytes = CryptoJS.AES.decrypt(param, process.env.SECRET_CRYPT)
  let original = bytes.toString(CryptoJS.enc.Utf8)
  return original
}


const generarCbu = () => {
  var banco = ("000" + ((Math.random() * 999) | 0)).slice(-3);
  var sucursal = ("0000" + ((Math.random() * 9999) | 0)).slice(-4);
  var cuenta =
    "111" + ("00000000" + ((Math.random() * 9999999) | 0)).slice(-10);
  let B = banco;
  let S = sucursal;
  let C = cuenta;
  var verificador1 =
    B[0] * 7 + B[1] * 1 + B[2] * 3 + S[0] * 9 + S[1] * 7 + S[2] * 1 + S[3] * 3;
  verificador1 = (10 - (verificador1 % 10)) % 10;
  var verificador2 =
    C[0] * 3 +
    C[1] * 9 +
    C[2] * 7 +
    C[3] * 1 +
    C[4] * 3 +
    C[5] * 9 +
    C[6] * 7 +
    C[7] * 1 +
    C[8] * 3 +
    C[9] * 9 +
    C[10] * 7 +
    C[11] * 1 +
    C[12] * 3;
  verificador2 = (10 - (verificador2 % 10)) % 10;
  const cbu = B + S + verificador1 + C + verificador2;
  return cbu.toString();
};

// CARD NUMBER
const generarCard = async () => {
  const card =
    "5" +
    "47526" +
    Math.floor(Math.random() * 9999999999) // Número random de 10 dígitos
      .toString()
      // Si no llega  a 10, se rellena con 0
      .padStart(9, "0");

  const hashedCard = await bcrypt.hash(card.slice(0, 13), 10);
  const visibleCard = card.slice(-4);

  const cardNumber = hashedCard + visibleCard;
  return cardNumber.toString();
};

const generarCvv = () => {
  let cvv = Math.floor(
    (Math.random() * (999 - 100) + 100).toString()
  ).toString();
  console.log(cvv)
  const encryptCvv = encrypt(cvv)
  return encryptCvv;
};



const generateCode = () => {
  var validationCode = generator.generate({
    length: 6,
    uppercase: false,
  });
  return validationCode;
};

const generateCargeNumber = () => {
  let params = {
    min: 11110000,
    max: 99999999,
    integer: true
  }
  const number = random(params)
  console.log(number)
  return number
}

generateCargeNumber()

function validateRegisterData({
  lastName,
  firstName,
  email,
  username,
  password,
  dni,
}) {
  const regExPassword = new RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.\-_#+])[A-Za-z\d@$!%*?&.-_#+]{6,16}$/
  );
  const regExUsername = new RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,16}$/
  );
  let error;
  if (!validator.isEmail(email)) error = "Email should have a valid format";
  else if (firstName.length > 32)
    error = "First Name cannot be longer than 32 caracters";
  else if (lastName.length > 32)
    error = "Last Name cannot be longer than 32 caracters";
  else if (dni.toString().length > 8 || dni.toString().length < 7)
    error = "DNI cannot be longer than 8 caracters or shorter than 7";
  else if (!username.match(regExUsername))
    error =
      "Username should have minimum 6 and maximum 16 characters, at least one uppercase letter, one lowercase letter and one number";
  else if (!password.match(regExPassword))
    error =
      "Password should have minimum 6 and maximum 16 characters, at least one uppercase letter, one lowercase letter, one number and one special character";
  else return { status: true, error };
  return { status: false, error };
}

module.exports = {
  generarCbu,
  generarCard,
  generarCvv,
  validateRegisterData,
  generateCode,
  decrypt,
  signToken,
  verifyToken,
};
