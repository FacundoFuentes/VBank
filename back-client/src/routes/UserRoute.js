const express = require("express");
const mongoose = require("mongoose");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Account = require("../models/Account");
const AccountTransaction = require("../models/AccountTransaction");
const Transaction = require("../models/Transaction");
const Card = require("../models/Card");
const Contact = require("../models/Contact");

const {ExtractJwt} = require('passport-jwt')
const user = express.Router()
const JwtStrategy = require('../utils/strategy/jwt.strategy')
const passport = require ('passport')
const jwtDecode = require('jwt-decode')
const emailUtils = require("../utils/email");
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
        amount: 100,
        description: "Welcome to VBank !",
        type: "CHARGE",
      });

      const accountTrans = await AccountTransaction.create({
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

      emailUtils.email(userCreated.validationCode, accountCreated.cvu, cardCreated.cardNumber, cardCreated.cvv, userCreated.email)

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

  const userFound = await User.findOne({username}).lean()

  if(!userFound) return res.status(404).json({status: 'failed', error: 'Invalid Credentials'})

  if(await bcrypt.compare(password, userFound.password)){

    const token = utils.signToken({id: userFound._id, username: userFound.username})

    return res.status(200).json({status: 'ok', data: token})

  } 

  return res.status(404).json({status: 'failed', error: 'Invalid Credentials'})

});

user.post('/userInfo', async (req, res) => {
  const {username} = req.body // add token

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

user.post('/userAccountInfo', async (req, res) =>{
  const {username} = req.body // add token

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


user.patch('/charge', passport.authenticate('jwt', {session: false}), async (req, res) => {

  const authToken = ExtractJwt.fromAuthHeaderAsBearerToken()(req)
  const decodedToken = jwtDecode(authToken)
  const {charge} = req.body

  try{
    const username = decodedToken.username
    const user = await User.findOne({username})
    const account_id = user.account
    const account = await Account.findById({_id: account_id})
    console.log(user.account)
    const transaction = await Transaction.create({
      transactionCode: "AD235hty", //Random
      date: new Date(),
      amount: charge,
      description: 'Enjoy your money!',
      type: 'CHARGE',
      // status: 'PROCESSING',
      from: null,
      to: user,
    });

    const accountTransaction = await AccountTransaction.create({
      role: "RECEIVER",
      transaction,
    });

    account.balance += charge
    account.transactions.push(accountTransaction)

    account.save()
    res.status(200).json({status: 'ok', transaction})

  }catch(err){
    console.log(err.message)
    res.status(400).json({status: 'failed', err})
  }
})



user.post('/newContact', async (req, res) => {
  const authToken = ExtractJwt.fromAuthHeaderAsBearerToken()(req)
  const decodedToken = jwtDecode(authToken)

  try{
    const username = decodedToken.username

    const {description, cvu} = req.body
    const  account =  await Account.findOne({cvu})
    const  user = await User.findOne({username})

    const contact = await Contact.create({
        account: account,
        description: description
    })

    user.contacts.push(contact)
    user.save()

    res.status(200).json({status: 'ok', contact})
  }catch(err){
    let error = err.message
    res.status(400).json({status: 'failed', error})
  }
})

user.post('/contacts', async(req, res) => {
  const authToken = ExtractJwt.fromAuthHeaderAsBearerToken()(req)
  const decodedToken = jwtDecode(authToken)

  try{
    const username = decodedToken.username
    const  user = await User.findOne({username}).populate({
      path: 'contacts',
      model: 'Contact'
    })
    const contacts = user.contacts
    res.status(200).json({status: 'ok', contacts})
  }catch(err){
    error = err.message
    res.status(400).json({status:'ok', error})
  }
})


user.delete('/deleteContact', async(req, res) => {
  const {_Id} = req.body
  try {
    const obj = await Contact.deleteOne({_Id});
    res.status(200).json({status:'ok', obj})
  }catch(err) {
    res.status(400).send(err.message)
  }
})

module.exports = user

