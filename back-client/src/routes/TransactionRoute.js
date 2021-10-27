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
require('dotenv').config()

const utils = require('../utils/utils')




transaction.post('/test', async(req,res) => {


   
    try{

        const transaction = await Transaction.create({
            transactionCode: 'AD235VI',
            date: new Date(),
            amount: 5000,
            description: 'Rent',
            type: 'TRANSFER',
            status: 'PROCESSING',
            from: '617999fce71cbb627fb4f4ce',
            to: '6179a7f2d6eaef4beb7c99e5'
        })

        res.status(200).json({status: 'ok', data: transaction})

    } catch (error) {

        res.status(400).send(error.message)

    }
})

module.exports = transaction