const express = require("express");
const utils = express.Router();
const accountTransaction = require("../models/AccountTransaction");
const Transaction = require("../models/Transaction");
const User = require("../models/User.js");
const Card = require("../models/Card.js");
const Account = require("../models/Account.js");
const FixedDeposit = require("../models/FixedDeposit.js")

utils.get("/", async (req, res) => {
  try {
    await accountTransaction.deleteMany({});
    await Transaction.deleteMany({});
    await FixedDeposit.deleteMany({});
    res.json({ data: "Meteorite succesfully landed" });
  } catch (error) {
    res.status(400).json({ data: "we ni borrar se puede" });
  }
});

utils.get("/full", async (req, res) => {
  try {
    await accountTransaction.deleteMany({});
    await Transaction.deleteMany({});
    await User.deleteMany({});
    await Account.deleteMany({});
    await Card.deleteMany({});
    res.json({ data: "Meteorite succesfully landed full" });
  } catch (error) {
    res.status(400).json({ data: "we ni borrar se puede" });
  }
});
module.exports = utils;
