const express = require("express");
const Account = require("../models/Account.js");
const FixedDeposit = require("../models/FixedDeposit.js");
const User = require("../models/User.js");
const Transaction = require("../models/Transaction");
const AccountTransaction = require("../models/AccountTransaction");
const JwtStrategy = require('../utils/strategy/jwt.strategy')
const passport = require ('passport')
const {ExtractJwt} = require('passport-jwt')
const jwtDecode = require('jwt-decode')
passport.use(JwtStrategy)

const fixedDeposit = express.Router();

fixedDeposit.post("/new", async (req, res) => {
  let { days, amount, interestRate } = req.body;
  interestRate = Number(interestRate.trim().replace('%',''))
  const authToken = ExtractJwt.fromAuthHeaderAsBearerToken()(req) //Extraigo el token que me llega por head
  const decodedToken = jwtDecode(authToken) // Decodeo el token
  const username = decodedToken.username;
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
      interestRate:interestRate/100,
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
});

fixedDeposit.post("/", async (req, res) => {
  const authToken = ExtractJwt.fromAuthHeaderAsBearerToken()(req) //Extraigo el token que me llega por head
  const decodedToken = jwtDecode(authToken) // Decodeo el token
  const username = decodedToken.username;
  
  try {
    const foundUser = await User.findOne({ username });
    const account = await Account.findOne({ _id: foundUser.account });
    let fixedDeposits = await FixedDeposit.find({account})
    res.json({ fixedDeposits });
  } catch (error) {
    console.log("ERROR ", error)
    res.status(400).json({ status: "failed", data: error });
  }
});

module.exports = fixedDeposit;