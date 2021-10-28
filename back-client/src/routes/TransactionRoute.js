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
     accountFrom = await Account.findOne({_id: userFrom.account})
     
     userTo = await User.findOne({username: to})
     accountTo = await Account.findOne({_id: userTo.account})

 } catch (error) {
     console.log(error)
     return res.status(400).json({status: 'failed', error: 'User not found or a meteorite landed on your house (or in the datacenter)'})
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
            role: 'SENDER',
            transaction
        })
        const accountTransactionTo = await AccountTransaction.create({
            role: 'RECEIVER',
            transaction
        })



        accountFrom.transactions.push(accountTransactionFrom)
        accountTo.transactions.push(accountTransactionTo)

        

        await accountFrom.save()
        await accountTo.save()

        res.status(200).json({status: 'ok', data: transaction})

    } catch (error) {
        
        res.status(400).send(error.message)

    }
})

module.exports = transaction