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

const { ExtractJwt } = require("passport-jwt");
const user = express.Router();
const JwtStrategy = require("../utils/strategy/jwt.strategy");
const passport = require("passport");
const jwtDecode = require("jwt-decode");
const emailUtils = require("../utils/email");
const utils = require("../utils/utils.js");

require("dotenv").config();

user.post("/register", async (req, res) => {
  const {
    lastName,
    firstName,
    email,
    username,
    password,
    dni,
    adress,
    birthDate,
    phoneNumber,
    zipCode,
  } = req.body;

  const userCheck = await User.findOne({username, dni})
  if(userCheck) return res.status(301).json({status: 'failed', data: "Already registered user, did you want to log in? "})

  const HashedPassword = await bcrypt.hash(password, 10);

  const validation = utils.validateRegisterData(req.body);

  if (validation.status) {
    try {
      const transaction = await Transaction.create({
        transactionCode: utils.generateCargeNumber(), //Random
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
        balance: 100,
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
        validationCode:utils.generateCode(),
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

      emailUtils.email(
        userCreated.username,
        userCreated.validationCode,
        accountCreated.cvu,
        cardCreated.cardNumber,
        cardCreated.cvv,
        userCreated.email
      );

      res.json({ status: "ok", data: userCreated });
    } catch (error) {
      console.log(error);
      res.json({ status: "failed", error: error });
    }
  } else {
    res.status(400).json({ status: "failed", data: validation.error });
  }
});

user.post("/changePassword", async (req, res) => {
  const authToken = ExtractJwt.fromAuthHeaderAsBearerToken()(req); //Extraigo el token que me llega por head
  const decodedToken = jwtDecode(authToken); // Decodeo el token
  const username = decodedToken.username;

  const { prevPassword, newPassword } = req.body;

  if (prevPassword === newPassword)
    return res
      .status(400)
      .json({
        status: "failed",
        data: "The new password cant be equal to the old password",
      });

  try {
    const userFound = await User.findOne({ username });

    if (!userFound)
      return res
        .status(400)
        .json({ status: "failed", data: "Invalid username" });

    if (!(await bcrypt.compare(prevPassword, userFound.password)))
      return res
        .status(400)
        .json({
          status: "failed",
          data: "The current password does not match ",
        });

    else userFound.password = await bcrypt.hash(newPassword, 10);

    userFound.save();

    res.status(200).json({ status: "ok", data: "Password changed succesfull" });

  } catch (error) {
    res.status(400).json({ status: "failed", data: "Error " + error });
  }
});

user.post("/login", async (req, res) => {
  const { username, password, dni } = req.body;
  console.log(req.body);

  const userFound = await User.findOne({ username, dni });
  todayDate = new Date();
if(!userFound) return res.status(400).json({status: 'failed', error: 'Invalid Credentials'})
if(userFound.status === "WAITING EMAIL VERIFICATION"){
    return res.status(400).json({status: 'failed', error: 'You must verify your account, check your email !!!'})
  }

  if (userFound.status === "BANED")
    if (userFound.banDate < todayDate) {
      userFound.banDate = null;
      userFound.status = "ACTIVE";
      userFound.save();
    } else
      return res.status(400).json({
        status: "failed",
        error: `Too many login attempts, you can try again on ${userFound.banDate.getDay()}/${userFound.banDate.getMonth()}/${userFound.banDate.getFullYear()}`,
      });

  if (userFound.failedAccessAtemps > 2) {
    userFound.banDate = todayDate;
    userFound.banDate.setDate(todayDate.getDate() + 1);
    userFound.save();
    return res.status(400).json({
      status: "failed",
      error: `Too many login attempts, you can try again on ${userFound.banDate.getDay()}/${userFound.banDate.getMonth()}/${userFound.banDate.getFullYear()}`,
    });
  }

  if (await bcrypt.compare(password, userFound.password)) {
    const token = utils.signToken({
      id: userFound._id,
      username: userFound.username,
    });
    return res.status(200).json({ status: "ok", data: token });
  }

  return res
    .status(404)
    .json({ status: "failed", error: "Invalid Credentials" });
});

user.post("/userInfo", async (req, res) => {
  const { username } = req.body; // add token

  try {
    const user = await User.findOne({ username });

    if (!user)
      return res
        .status(404)
        .json({ status: "failed", error: "Invalid username" });

    res.status(200).json({
      firstname: user.firstName,
      lastname: user.lastName,
      email: user.email,
      dni: user.dni,
      adress: user.adress,
      phoneNumber: user.phoneNumber,
      zipCode: user.zipCode,
      birthDate: user.birthDate,
    });
  } catch (error) {
    res.status(400).json({ status: "failed", error: error.message });
  }
});

user.post("/updateInfo", async (req, res )  => {
  const authToken = ExtractJwt.fromAuthHeaderAsBearerToken()(req); //Extraigo el token que me llega por head
  const decodedToken = jwtDecode(authToken); // Decodeo el token
  const username = decodedToken.username;

  const {zipCode, address} = req.body

  try {
    const userFound = await User.findOne({username})
    if(!userFound) return res.status(400).json({status: 'failed', data: 'User not found, please reload the page'})
  
    userFound.zipCode = zipCode
    userFound.address = address
    
    userFound.save()
    res.json({status: 'ok', data: userFound})
  } catch (error) {
    res.status(400).json({status: 'failed', data: "Error: " + error})
  }
})

user.post("/userAccountInfo", async (req, res) => {
  const { username } = req.body; // add token

  try {
    const user = await User.findOne({ username }).populate({
      path: "account",
      model: "Account",
      populate: {
        path: "card",
        model: "Card",
      },
    });

    if (!user)
      return res
        .status(404)
        .json({ status: "failed", error: "Invalid username" });

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
      },
    });
  } catch (error) {
    res.status(400).json({ status: "failed", error: error.message });
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
      status: 'PENDING',
      type: 'CHARGE',
      // status: 'PROCESSING',
      from: null,
      to: user,
    });

    const accountTransaction = await AccountTransaction.create({
      role: "RECEIVER",
      transaction,
    });

    const QR = await utils.generateQR(`localhost:3001/transactions/authorize/${transaction.transactionCode}`)
    emailUtils.chargeEmail(user.email)

    account.transactions.push(accountTransaction)
    account.save()
    
      res.status(200).json({ status: "ok", transaction, QR });
    } catch (err) {
      console.log(err.message);
      res.status(400).json({ status: "failed", err });
    }
  }
);

user.post("/newContact", async (req, res) => {
  const authToken = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
  const decodedToken = jwtDecode(authToken);

  try {
    let contactAccount, contactUser;

    const username = decodedToken.username;
    const user = await User.findOne({username: decodedToken.username}).populate('contacts')
    const { description, data } = req.body;

    if (data.length > 16) {//Si es CVU
      contactAccount = await Account.findOne({ cvu: data }).populate({ //Busco la cuenta del usuario RECEIVER
        path: "user",
        model: "User",
      }); 

      if(!contactAccount) return res.status(404).json({status: 'failed', error: 'Account not found'})

      contactUser = await User.findOne({ _id: contactAccount.user }).populate(
        "account"
      );
    } else {
      contactUser = await User.findOne({ username: data }).populate("account");
      if(!contactUser) return res.status(404).json({status: 'failed', error: 'User not found'})
      contactAccount = await Account.findOne({
        _id: contactUser.account,
      }).populate({
        path: "user",
        model: "User",
      });
    }
    let existingContact
    user.contacts.forEach(element => {
      if(element.username === contactUser.username){
        existingContact = true
        return
      }
    })

    if(existingContact) return res.status(301).json({
      status: 'failed', error: 'User already exists in your contacts'})

    if (username === contactUser.username)
      return res.status(400).json({
        status: "failed",
        error: "You can't create a contact of yourself",
      });

    const contact = await Contact.create({
      description: description,
      cvu: contactAccount.cvu,
      username: contactAccount.user.username,
    });

    user.contacts.push(contact);
    user.save();

    return res.status(200).json({ status: "ok", contact });
  } catch (err) {
    let error = err.message;
    return res.status(400).json({ status: "failed", error });
  }
});

user.get("/contacts", async (req, res) => {
  const authToken = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
  const decodedToken = jwtDecode(authToken);

  try {
    const username = decodedToken.username;
    const user = await User.findOne({ username }).populate({
      path: "contacts",
      model: "Contact",
    });
    const contacts = user.contacts;
    res.status(200).json({ status: "ok", contacts });
  } catch (err) {
    error = err.message;
    res.status(400).json({ status: "failed", error });
  }
});

user.patch("/updateContact", async (req, res) => {
  const { _Id, description } = req.body;
  try {
    const contact = await Contact.findOne({ _Id });
    if(!contact) return res.status(404).json({status: 'failed', data: 'Contact not found'})
    contact.description = description;
    contact.save();

    res.status(200).json({ status: "ok", contact });
  } catch (err) {
    error = err.message;
    res.status(400).json({ status: "failed", error });
  }
});

//El delete no permite body, paso el id por param
user.delete("/deleteContact/:id", async (req, res) => {
  const { id } = req.params;

  console.log(req.params);

  try {
    const obj = await Contact.deleteOne({ _id: id });
    res.status(200).json({ status: "ok", obj });
  } catch (err) {
    res.status(400).send(err.message);
  }
});


user.patch("/emailVerification/:username", async (req, res) => {


  try {
    const {code} = req.body;
    const {username} = req.params
    const user = await User.findOne({ username })

    if(user.status === 'ACTIVE') {
      return res.status(200).json({status: 'Account already verified'})
    }

    if(utils.decrypt(user.validationCode) === code ) {
      user.status = 'ACTIVE';
      user.save()

      return res.status(200).json({status:'Account verified'})
    }

    return res.status(400).json({status:'failed, invalid code'})
    
  }catch(error){
    res.status(400).send(error.message)
  }

})


module.exports = user;
