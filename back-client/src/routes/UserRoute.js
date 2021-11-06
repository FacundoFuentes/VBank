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
        transactionCode:  utils.generateCargeNumber(), //Random
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
        balance: 0,
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

      accountCreated.balance += transaction.amount;
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
  const {username, password, dni} = req.body

  const userFound = await User.findOne({username, dni}).lean()

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
      transactionCode: utils.generateCargeNumber(), //Random
      date: new Date(),
      amount: Number(charge),
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

    account.balance += Number(charge)
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
  let contactAccount, contactUser;

  try{
    const username = decodedToken.username
    const user = await User.findOne({username: decodedToken.username})
    const {description, data} = req.body

    if(data.length > 16){ //Si es CVU
      contactAccount= await Account.findOne({cvu: data}).populate({
        path: 'user',
        model:  'User'
      })//Busco la cuenta del usuario RECEIVER
      contactUser = await User.findOne({_id: contactAccount.user}).populate('account')
    } else{
      contactUser = await User.findOne({ username: data}).populate('account')
      contactAccount = await Account.findOne({_id: contactUser.account})
    } 

    if(username === contactUser.username)return res.status(400).json({ //Si el usuario logeado es el mismo que el receiver
      status: "failed",
      error:
        "You can't create a contact of yourself",
    })

    // const  account =  await Account.findOne({cvu: cvu})
    // const  user = await User.findOne({username})
    // console.log(account)

    const contact = await Contact.create({
        account: contactAccount,
        description: description
    })


    const response = {
      cvu: contact.account.cvu,
      username: contact.account.user.username,
      firstName: contact.account.user.firstName,
      lastName: contact.account.user.lastName


    }
    
    user.contacts.push(contact)
    user.save()

    res.status(200).json({status: 'ok', response})
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
    res.status(400).json({status:'failed', error})
  }
})

user.patch('/updateContact', async(req, res) => {
  const {_Id, description} = req.body
  try {
    const contact= await Contact.findOne({_Id})
    contact.description = description
    contact.save() 

    res.status(200).json({status: 'ok', contact})

  }catch(err){
    error = err.message
    res.status(400).json({status:'failed', error})
  }
})

user.delete('/deleteContact', async(req, res) => {
  const {_Id} = req.body
  try {
    const obj = await Contact.deleteOne({_id: _Id});
    res.status(200).json({status:'ok', obj})
  }catch(err) {
    res.status(400).send(err.message)
  }
})

module.exports = user

