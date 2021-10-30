const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Account = require("../models/Account");
const accountTransaction = require("../models/AccountTransaction");
const Transaction = require("../models/Transaction");
const Card = require("../models/Card");
const user = express.Router()


const email = require("../utils/email");
const utils = require("../utils/utils.js");
require("dotenv").config();

user.post("/register", async (req, res) => {
  const { lastName, firstName, email, username, password, dni, adress, birthDate, phoneNumber, zipCode } = req.body;

  const HashedPassword = await bcrypt.hash(password, 10);

  const validation = utils.validateRegisterData(req.body);

  if (validation.status) {
    try {
      const transaction = await Transaction.create({
        transactionCode: "AAAA1", //Random
        date: new Date(),
        amount: 1,
        description: "Welcome to VBank !",
        type: "CHARGE",
      });

      const accountTrans = await accountTransaction.create({
        role: "RECEIVER",
        transaction,
      });

      const cardCreated = await Card.create({
        cardNumber: await utils.generarCard(),
        startDate: new Date(2021, 10, 27),
        dueDate: new Date(2026, 10, 27),
        status: "Blocked",
        cvv: utils.generarCvv(),
      });

      const accountCreated = await Account.create({
        cvu: utils.generarCbu(),
        state: true,
        balance: 10000,
        type: "Caja de ahorro en pesos",
        card: cardCreated._id,
        transactions: accountTrans._id,
      });

      const userCreated = await User.create({
        lastName,
        firstName,
        email,
        username,
        password: HashedPassword,
        validationCode: await bcrypt.hash(utils.generateCode(), 10),
        dni,
        account: accountCreated._id,
        adress, //Recently added
        phoneNumber, //Recently added
        zipCode, //Recently added
        birthDate, //Recently added
      });

      cardCreated.account = accountCreated._id;
      await cardCreated.save();

      accountCreated.user = userCreated._id;
      await accountCreated.save();

      res.json({ status: "ok", data: userCreated });
    } catch (error) {
      console.log(error);
      res.json({ status: "failed", error: error });
    }
  } else {
    res.status(400).json({ status: "failed", data: validation.error });
  }
});

user.post("/login", async (req, res) => {
  const {username, password} = req.body

  const userFound = User.findOne({username}).lean()

  if(!userFound) return res.status(404).json({status: 'failed', error: 'Invalid Credentials'})

  if(bcrypt.compare(password, userFound.password)){

    const token = utils.signToken({id: user._id, username: user.username})

    return res.status(200).json({status: 'ok', data: token})

  } 

  return res.status(404).json({status: 'failed', error: 'Invalid Credentials'})



});

user.get("/email", async (req, res) => {
  try {
    const mail = await email.transporter.sendMail({
      from: "Remitente",
      to: "simoncito@hotmail.com", // recuperar desde user
      subject: "Verification Email",
      text: "Codigo de verificacion: ****", // o html
    });

    res.status(200).json({ status: "ok", data: mail });
  } catch (error) {
    emailStatus = error;
    return res.status(400).json({ message: "Something went wrong! " });
  }
});

user.get('/userInfo', async (req, res) => {
  const {username} = req.body

  try {
    
    const user = await User.findOne({username})

    if(!user) return res.status(404).json({status: 'failed', error: 'Invalid username'})

    res.status(200).json({
        firstname: user.firstName,
        lastname: user.lastName,
        email: user.email,
        dni: user.dni,
        adress: user.adress, //Recently added
        phoneNumber: user.phoneNumber, //Recently added
        zipCode: user.zipCode, //Recently added
        birthDate: user.birthDate, //Recently added
    })
      
  } catch (error) {
    res.status(400).json({status: 'failed', error: error.message})
  }
})

user.get('/userAccountInfo', async (req, res) =>{
  const {username} = req.body

  try {
    const user = await User.findOne({username}).populate({
      path: 'account',
      model: 'Account',
      populate: {
        path: 'card',
        model: 'Card'
      }
    })

    if(!user) return res.status(404).json({status: 'failed', error: 'Invalid username'})

    res.status(200).json({
      cvu: user.account.cvu,
      state: user.account.state,
      balance: user.account.balance,
      type: user.account.type,
      card: {
        cardNumber: user.account.card.cardNumber.slice(-4),
        startDate: user.account.card.startDate,
        dueDate: user.account.card.dueDate,
        status: user.account.card.status,
      }
    })
  } catch (error) {
    res.status(400).json({status: 'failed', error: error.message})
  }
} )

module.exports = user
