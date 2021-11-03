const express = require("express");
const User = require("../models/User");
const Account = require("../models/Account");
const Transaction = require("../models/Transaction");
const transaction = express.Router();
const bcrypt = require('bcrypt')
const AccountTransaction = require("../models/AccountTransaction");
const utils = require('../utils/utils')
const JwtStrategy = require('../utils/strategy/jwt.strategy')
const passport = require ('passport')
const {ExtractJwt} = require('passport-jwt')
const jwtDecode = require('jwt-decode')
require("dotenv").config();
passport.use(JwtStrategy)

transaction.post("/new",
passport.authenticate('jwt', {session: false}), async (req, res) => {

  const { amount, to, description, type, cvv, branch } = req.body; //Me traigo los datos del body
  const authToken = ExtractJwt.fromAuthHeaderAsBearerToken()(req) //Extraigo el token que me llega por head
  const decodedToken = jwtDecode(authToken) //Hago el decode del token
  let userFrom, userTo, accountFrom, accountTo; //Variables auxiliares
  
  try { 
    if(decodedToken.username === to) return res.status(400).json({ //Si el usuario logeado es el mismo que el receiver
      status: "failed",
      error:
        "You can't receive money from yourself",
    })

    userFrom = await User.findOne({ username: decodedToken.username }); //Busco el usuario cuyo username es el del token
    userTo = await User.findOne({ username: to }); //Busco el ususario receiver

    if (!userFrom || !userTo) //Si alguno de los dos no existe
      return res.status(400).json({
        status: "failed",
        error:
          "User not found or a meteorite landed on your house (or in the data center)",
      });

      
      accountFrom = await Account.findOne({ _id: userFrom.account }).populate({ //Busco la cuenta del usuario SENDER
        path: 'card',
        model: 'Card',
      });
      if(!(utils.decrypt(accountFrom.card.cvv) === cvv)){ //Si el CVV del SENDER es invalido
        return res.status(400).json({status: 'failed', error: 'CVV is not valid'})
      } 
      
    accountTo = await Account.findOne({ _id: userTo.account });//Busco la cuenta del usuario RECEIVER
  } catch (error) {
    return res.status(400).json({
      status: "failed",
      error:
        "User not found or a meteorite landed on your house (or in the datacenter)",
    });
  }

  if (accountFrom.balance - amount < 0) //Si el SENDER no tiene dinero suficiente
    return res
      .status(400)
      .json({ status: "failed", error: "User dont have enough money" });

  try {
    const transaction = await Transaction.create({ //Creo la transaccion correspondiente
      transactionCode: "AD235VI",
      date: new Date(),
      amount,
      description,
      type,
      from: userFrom,
      to: userTo,
      branch,
    });

    const accountTransactionFrom = await AccountTransaction.create({ //Se la asigno al SENDER con su rol
      role: "SENDER",
      transaction,
    });
    const accountTransactionTo = await AccountTransaction.create({ //Se la asigno al RECEIVER con su rol
      role: "RECEIVER",
      transaction,
    });

    accountFrom.transactions.push(accountTransactionFrom); //Pusheo la transaccion al historial
    accountFrom.balance -= amount; //Descuento del dinero del SENDER
    accountTo.transactions.push(accountTransactionTo); //Pusheo la transaccion al historial
    accountTo.balance = accountTo.balance + Number(amount); //Sumo al dinero del RECEIVER

    await accountFrom.save(); //Guardo en la BD
    await accountTo.save(); //Guardo en la BD

    return res.status(200).json({ status: "ok", data: transaction }); //Si todo salio OK
  } catch (error) {
    return res.status(400).send(error.message); //Error
  }
});

transaction.post("/", async (req, res) => {

  const {username} = req.body
  try {
    
    const user = await User.findOne({ username }).populate('account')
    const accountTransactions = await Account.findOne({_id: user.account._id}).populate({
      path: 'transactions',
      model: 'AccountTransaction',
      populate: {
        path: 'transaction',
        model: 'Transaction'
      }
    })

    res.status(200).send(accountTransactions.transactions)

  } catch (error) {
    res.status(404).send({status: 'failed', data: error})
  }

});

module.exports = transaction;
