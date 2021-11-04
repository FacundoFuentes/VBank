const express = require("express");
const Account = require("../models/Account.js");
const PlaceishonFijeishon = require("../models/PlaceishonFijeishon.js");
const User = require("../models/User.js");
const Transaction = require("../models/Transaction");
const AccountTransaction = require("../models/AccountTransaction");

const plazo = express.Router();

//
//ACCOUNT TIENE QUE TENER ARRAY CON PLAZOS
//
// TRANSACTION TIENE QUE TENER OPCIÓN PARA PLAZO FIJO
//
// QUIZÁS SE PODRÍA MODULARIZAR LA CREACIÓN DE LA TRANSACCIÓN

plazo.post("/new", async (req, res) => {
  const { token, days, amount } = req.body;
  // Extraer username del token
  const username = token.username;
  try {
    const foundUser = await User.findOne({ username });
    const foundAccount = await Account.findOne({ _id: foundUser.account._id });
    if (foundAccount.balance < amount)
      return res.status(400).json({
        status: "failed",
        data: "You dont have enough in your account",
      });
    const transactionCreated = await Transaction.create({
      date: new Date(),
      amount,
      description: "Plazo fijo on FECHA",
      type: "Plazo",
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
    const plazoCreated = await PlaceishonFijeishon.create({
      account: foundAccount,
      amount,
    });
    foundAccount.balance -= amount;
    foundAccount.save();
    res.json({ status: "ok", data: plazoCreated });
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

plazo.get("/", async (req, res) => {
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

plazo.post("/cobrar", async (req, res) => {
  const { plazoId } = req.body;

  try {
    const plazoFound = await PlaceishonFijeishon.findOne({ _id: plazoId });
    if (plazoFound && plazoFound.status === "Finished") {
      const accountFound = await Account.findOne({
        cvu: plazoFound.account.cvu,
      });
      accountFound.balance += plazoFound.amount * (1 + plazoFound.interes);
      plazoFound.status = "Cobraded";
      accountFound.save();
      plazoFound.save();
    } else
      res.status(400).json({ status: "failed", data: "Plazo does not exists" });
  } catch (error) {
    res.json({ status: "failed", data: error });
  }
});

module.exports = plazo;
