// CALCULO CBU

// const generator = require('creditcard-generator')
const bcrypt = require('bcrypt')

const generarCbu = ()=> {
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
function generarCard() {
  return (
    "5" +
    "47526" +
    Math.floor(Math.random() * 9999999999) // Número random de 10 dígitos
      .toString()
      // Si no llega  a 10, se rellena con 0
      .padStart(9, "0")
  );
}

 const generarCvv = async () => {

  let cvv = Math.floor((Math.random() * 999).toString().padStart("1")).toString()
  cvv = await bcrypt.hash(cvv, 10);
  return cvv
}



module.exports = {
    generarCbu,
    generarCard,
    generarCvv,
}