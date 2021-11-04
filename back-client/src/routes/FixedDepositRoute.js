const express = require("express");
const Account = require("../models/Account.js");
const FixedDeposit = require("../models/FixedDeposit.js");
const User = require("../models/User.js");
const Transaction = require("../models/Transaction");
const AccountTransaction = require("../models/AccountTransaction");

const fixedDeposit = express.Router();

//
//ACCOUNT TIENE QUE TENER ARRAY CON PLAZOS
//
// TRANSACTION TIENE QUE TENER OPCIÓN PARA PLAZO FIJO
//

fixedDeposit.post("/new", async (req, res) => {
  const { username, days, amount, interestRate } = req.body;
  // const authToken = ExtractJwt.fromAuthHeaderAsBearerToken()(req) //Extraigo el token que me llega por head
  // const decodedToken = jwtDecode(authToken) // Decodeo el token
  // const username = decodedToken.username;
  try {
    const foundUser = await User.findOne({ username });
    const foundAccount = await Account.findOne({ _id: foundUser.account });
    if (foundAccount.balance < amount)
      return res.status(400).json({
        status: "failed",
        data: "You dont have enough in your account",
      });
      const todayDate = new Date()
      const finishDate = new Date()
      finishDate.setDate(todayDate.getDate() + days)
    const transactionCreated = await Transaction.create({
      date: todayDate,
      amount,
      description: `Fixed Deposit on ${todayDate.getMonth()}/${todayDate.getDay()}/${todayDate.getFullYear()}` ,
      type: "FIXED DEPOSIT",
      transactionCode: "ADS61Q" /*Randomizar*/,
    });
    if (!transactionCreated)
      res
        .status(400)
        .json({
          status: "failed",
          data: "An unknown error ocurred during creation",
        });
    const accountTransactionCreated = await AccountTransaction.create({
      transaction: transactionCreated,
      role: "SENDER",
    });
    if (!accountTransactionCreated)
      res
        .status(400)
        .json({
          status: "failed",
          data: "An unknown error ocurred during creation",
        });
    const fixedDepositCreated = await FixedDeposit.create({
      account: foundAccount,
      amount,
      interestRate,
      finishDate
    });
    foundAccount.balance -= amount;
    foundAccount.save();
    res.json({ status: "ok", data: fixedDepositCreated });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      data: error,
    });
  }
  const todayDate = new Date();
  if (days && days > 0) {
    // Add the days amount of days to date
  }
});

fixedDeposit.get("/", async (req, res) => {
  const { cvu } = req.body;

  // Popular y traer el array con todos los plazos

  try {
    let plazos = await Account.findOne({ cvu });
    const todayDate = new Date();
    plazos = plazos.map((p) => {
      if (p.finishDate <= todayDate) p.status = "Finished";
    });
    res.json({ plazos });
  } catch (error) {
    res.status(400).json({ status: "failed", data: error });
  }
});

fixedDeposit.post("/cobrar", async (req, res) => {
  const { fixedDepositId } = req.body;

  try {
    const fixedDepositFound = await FixedDeposit.findOne({ _id: fixedDepositId });
    if (fixedDepositFound && fixedDepositFound.status === "Finished") {
      const accountFound = await Account.findOne({
        cvu: fixedDepositFound.account.cvu,
      });
      accountFound.balance += fixedDepositFound.amount * (1 + fixedDepositFound.interes);
      fixedDepositFound.status = "Cobraded";
      accountFound.save();
      fixedDepositFound.save();
    } else
      res.status(400).json({ status: "failed", data: "Fixed Deposit does not exists" });
  } catch (error) {
    res.json({ status: "failed", data: error });
  }
});

module.exports = fixedDeposit;
