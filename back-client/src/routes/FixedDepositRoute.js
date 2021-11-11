const express = require("express");
const Account = require("../models/Account.js");
const FixedDeposit = require("../models/FixedDeposit.js");
const User = require("../models/User.js");
const Transaction = require("../models/Transaction");
const AccountTransaction = require("../models/AccountTransaction");
const JwtStrategy = require("../utils/strategy/jwt.strategy");
const passport = require("passport");
const { ExtractJwt } = require("passport-jwt");
const jwtDecode = require("jwt-decode");
const { generateCargeNumber } = require("../utils/utils.js");
passport.use(JwtStrategy);
const fixedDeposit = express.Router();

const checkFixedDeposit = async () => {
  console.log("*** EJECUTANDO CHECKEO DE PLAZOS FIJOS ***");
  try {
    let fixedDeposits = await FixedDeposit.find({});
    const todayDate = new Date();
    for (let i = 0; i < fixedDeposits.length; i++) {
      // Primero evalúa que no se hayan cobrado, luego que esté vencido
      if (
        fixedDeposits[i].status === "Active" &&
        fixedDeposits[i].finishDate <= todayDate
      ) {
        // En tal caso cambia el estado
        fixedDeposits[i].status = "Received";
        // Busca la cuenta relacionada al plazo
        const accountFound = await Account.findOne({
          _id: fixedDeposits[i].account,
        });
        // Si no la encuentra sigue con el siguiente (pasa cuando borras la cuenta y no sus plazos fijos)
        if (!accountFound) continue;
        accountFound.balance += fixedDeposits[i].total;
        // Crea la transaction y la accTransaction
        const transactionCreated = await Transaction.create({
          date: todayDate,
          amount: fixedDeposits[i].total,
          description: `Fixed Deposit profits on ${todayDate.getMonth()}/${todayDate.getDay()}/${todayDate.getFullYear()}`,
          type: "FIXED DEPOSIT",
          transactionCode: generateCargeNumber(),
        });
        const accountTransactionCreated = await AccountTransaction.create({
          transaction: transactionCreated,
          role: "RECEIVER",
        });
        // Si llegó al último paso correctamente, actualiza los datos en DB sino los descarta
        if (accountTransactionCreated) {
          await accountFound.save();
          await fixedDeposits[i].save();
        }
      }
    }
    console.log("*** CHECKEO DE PLAZOS FIJOS FINALIZADO CORRECTAMENTE ***");
  } catch (error) {
    console.log("Error checking for fixed deposits due", error);
  }
};
// Demo
// Esta función checkea cada unos segundos los depósitos
function demo() {
  checkFixedDeposit();
  setTimeout(demo, 500000);
}
//Retraso de 5 segundos para que no se ejecute antes de poder conectar con la DB
setTimeout(demo, 5000);
// Esta es la función NO DEMO, checkea cada día a las 00:10 los plazos fijos
// schedule.scheduleJob("0 10 * * *", async () => {
//     checkFixedDeposit()
// });

fixedDeposit.post("/new", async (req, res) => {
  let { due, amount, total } = req.body;
  const todayDate = new Date();
  let finishDate = new Date(due);
  if (finishDate < todayDate)
    res
      .status(400)
      .json({
        status: "failed",
        data: "Finish date cannot be earlier than the start date",
      });

  // DEMO
  //
  const daysBetween = Math.floor(
    (finishDate - todayDate) / (1000 * 60 * 60 * 24)
  );
  finishDate = todayDate;
  finishDate.setSeconds(todayDate.getSeconds() + daysBetween);
  console.log(`El plazo fijo se ejecutará dentro de ${daysBetween} segundos`);
  //
  //

  const authToken = ExtractJwt.fromAuthHeaderAsBearerToken()(req); //Extraigo el token que me llega por head
  const decodedToken = jwtDecode(authToken); // Decodeo el token
  const username = decodedToken.username;
  try {
    const foundUser = await User.findOne({ username });
    const foundAccount = await Account.findOne({ _id: foundUser.account });
    if (foundAccount.balance < amount)
      return res.status(400).json({
        status: "failed",
        data: "You dont have enough in your account",
      });
    const transactionCreated = await Transaction.create({
      date: todayDate,
      amount,
      description: `Fixed Deposit on ${todayDate.getMonth()}/${todayDate.getDay()}/${todayDate.getFullYear()}`,
      type: "FIXED DEPOSIT",
      transactionCode: generateCargeNumber(),
    });
    const accountTransactionCreated = await AccountTransaction.create({
      transaction: transactionCreated,
      role: "SENDER",
    });
    const fixedDepositCreated = await FixedDeposit.create({
      account: foundAccount,
      amount,
      total,
      finishDate,
    });
    foundAccount.fixedDeposit.push(fixedDepositCreated);
    if (!foundAccount || !accountTransactionCreated || !fixedDepositCreated) {
      return res
        .status(400)
        .json({ status: "failed", data: "An unknown error ocurred" });
    }
    foundAccount.balance -= amount;
    foundAccount.save();
    res.json({ status: "ok", data: fixedDepositCreated });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      data: "Error: " + error,
    });
  }
});

fixedDeposit.post("/", async (req, res) => {
  const authToken = ExtractJwt.fromAuthHeaderAsBearerToken()(req); //Extraigo el token que me llega por head
  const decodedToken = jwtDecode(authToken); // Decodeo el token
  const username = decodedToken.username;

  try {
    const foundUser = await User.findOne({ username });
    const account = await Account.findOne({ _id: foundUser.account });
    let fixedDeposits = await FixedDeposit.find({ account });
    res.json({ fixedDeposits });
  } catch (error) {
    console.log("ERROR ", error);
    res.status(400).json({ status: "failed", data: error });
  }
});

module.exports = fixedDeposit;
