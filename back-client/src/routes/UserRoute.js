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

      emailUtils.email(
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
    return res.status(400).json({
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
      return res.status(400).json({
        status: "failed",
        data: "The previous password does not match ",
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

  const userFound = await User.findOne({ username, dni });
  todayDate = new Date();

  if (userFound.status === "BANED")
    if (userFound.banDate < todayDate) {
      userFound.banDate = null;
      userFound.status = "ACTIVE";
      userFound.save();
    } else
      return res.status(400).json({
        status: "failed",
        data: `Too many login attempts, you can try again on ${userFound.banDate.getDay()}/${userFound.banDate.getMonth()}/${userFound.banDate.getFullYear()}`,
      });

  if (userFound.failedAccessAtemps > 2) {
    userFound.banDate = todayDate;
    userFound.banDate.setDate(todayDate.getDate() + 1);
    userFound.save();
    return res.status(400).json({
      status: "failed",
      data: `Too many login attempts, you can try again on ${userFound.banDate.getDay()}/${userFound.banDate.getMonth()}/${userFound.banDate.getFullYear()}`,
    });
  }

  if (!userFound)
    return res
      .status(404)
      .json({ status: "failed", error: "Invalid Credentials" });

  if (await bcrypt.compare(password, userFound.password)) {
    const token = utils.signToken({
      id: userFound._id,
      username: userFound.username,
    });
    userFound.failedAccessAtemps = 0;
    userFound.save();
    return res.status(200).json({ status: "ok", data: token });
  }

  userFound.failedAccessAtemps += 1;
  userFound.save();

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

    return res.status(200).json({
      firstname: user.firstName,
      lastname: user.lastName,
      email: user.email,
      dni: user.dni,
      adress: user.adress, //Recently added
      phoneNumber: user.phoneNumber, //Recently added
      zipCode: user.zipCode, //Recently added
      birthDate: user.birthDate, //Recently added
    });
  } catch (error) {
    res.status(400).json({ status: "failed", error: error.message });
  }
});

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
});

    const QR = await utils.generateQR(`localhost:3001/transactions/authorize/${transaction.transactionCode}`)
    console.log(QR)
    emailUtils.chargeEmail(QR, user.email)
    account.transactions.push(accountTransaction)
    account.save()
    
    res.status(200).json({status: 'ok', transaction})

      const accountTransaction = await AccountTransaction.create({
        role: "RECEIVER",
        transaction,
      });

      account.transactions.push(accountTransaction);
      account.save();

      res.status(200).json({ status: "ok", transaction });
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
    const user = await User.findOne({ username: decodedToken.username });
    const { description, data } = req.body;

    if (data.length > 16) {
      //Si es CVU
      contactAccount = await Account.findOne({ cvu: data }).populate({
        path: "user",
        model: "User",
      }); //Busco la cuenta del usuario RECEIVER
      contactUser = await User.findOne({ _id: contactAccount.user }).populate(
        "account"
      );
    } else {
      contactUser = await User.findOne({ username: data }).populate("account");
      contactAccount = await Account.findOne({
        _id: contactUser.account,
      }).populate({
        path: "user",
        model: "User",
      });
    }

    if (username === contactUser.username)
      return res.status(400).json({
        //Si el usuario logeado es el mismo que el receiver
        status: "failed",
        error: "You can't create a contact of yourself",
      });

    const contact = await Contact.create({
      // account: contactAccount.,
      description: description,
      cvu: contactAccount.cvu,
      username: contactAccount.user.username,
    });

    // const response = {
    //   firstName: contact.account.user.firstName,
    //   lastName: contact.account.user.lastName
    // }

    user.contacts.push(contact);
    user.save();

    res.status(200).json({ status: "ok", contact });
  } catch (err) {
    let error = err.message;
    res.status(400).json({ status: "failed", error });
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

module.exports = user;
