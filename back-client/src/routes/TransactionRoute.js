const express = require("express");
const User = require("../models/User");
const Account = require("../models/Account");
const Transaction = require("../models/Transaction");
const transaction = express.Router();
const AccountTransaction = require("../models/AccountTransaction");
require("dotenv").config();

transaction.post("/new", async (req, res) => {
  const { amount, from, to, description, type } = req.body;
  let userFrom, userTo;
  try {
    userFrom = await User.findOne({ username: from });
    userTo = await User.findOne({ username: to });

    if (!userFrom || !userTo)
      return res
        .status(400)
        .json({
          status: "failed",
          error:
            "User not found or a meteorite landed on your house (or in the data center)",
        });

    accountFrom = await Account.findOne({ _id: userFrom.account });
    accountTo = await Account.findOne({ _id: userTo.account });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({
        status: "failed",
        error:
          "User not found or a meteorite landed on your house (or in the datacenter)",
      });
  }

  if (accountFrom.balance - amount < 0)
    return res
      .status(400)
      .json({ status: "failed", error: "User dont have enough money" });

  try {
    const transaction = await Transaction.create({
      transactionCode: "AD235VI", //Random
      date: new Date(),
      amount,
      description,
      type,
      // status: 'PROCESSING',
      from: userFrom,
      to: userTo,
    });

    const accountTransactionFrom = await AccountTransaction.create({
      role: "SENDER",
      transaction,
    });
    const accountTransactionTo = await AccountTransaction.create({
      role: "RECEIVER",
      transaction,
    });

    accountFrom.transactions.push(accountTransactionFrom);
    accountFrom.balance -= amount;
    accountTo.transactions.push(accountTransactionTo);
    accountTo.balance = accountTo.balance + Number(amount);

    await accountFrom.save();
    await accountTo.save();

    return res.status(200).json({ status: "ok", data: transaction });
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

module.exports = transaction;
