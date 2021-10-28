const express = require('express')
const mongoose = require('mongoose')
const User = require('../models/User')
const Account = require('../models/Account')
const Transaction = require('../models/Transaction')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Card = require('../models/Card')
const email = require('../utils/email')
const transaction = express.Router()
const utils = require('../utils/utils')
const AccountTransaction = require('../models/AccountTransaction')
require('dotenv').config()


transaction.post('/test', async(req,res) => {
 const {amount, from, to, description, type } = req.body
 let userFrom, userTo
 try {     
     userFrom = await User.findOne({username: from})
     console.log(userFrom)
     userTo = await User.findOne({username: to})
 } catch (error) {
     console.log(error)
     res.status(400).json({status: 'failed', error: 'User not found or a meteorite landed on your house (or in the datacenter)'})
 }

    try{
        const transaction = await Transaction.create({
            transactionCode: 'AD235VI', //Random
            date: new Date(),
            amount,
            description,
            type,
            // status: 'PROCESSING',
            from: userFrom,
            to: userTo
        })

        const accountTransactionFrom = await AccountTransaction.create({
            type: 'SENDER',
            transaction
        })
        const accountTransactionTo = await AccountTransaction.create({
            type: 'RECEIVER',
            transaction
        })

        userFrom.account.transactions.push(accountTransactionFrom)
        await userFrom.save()
        userTo.account.transactions.push(accountTransactionTo)
        await userTo.save()


        res.status(200).json({status: 'ok', data: transaction})

    } catch (error) {

        res.status(400).send(error)

    }
})

module.exports = transaction