const express = require('express')
const mongoose = require('mongoose')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Account = require('../models/Account')
const accountTransaction = require('../models/AccountTransaction')
const Transaction = require('../models/Transaction')
const Card = require('../models/Card')

const email = require('../utils/email')
const user = express.Router()
const utils = require('../utils/utils.js')
require('dotenv').config()

user.post('/register', async (req, res) => {
    const {lastName, firstName, email, username, password, dni} = req.body

    const HashedPassword = await bcrypt.hash(password, 10)
    
    const validation = utils.validateRegisterData(req.body)

    if(validation.status){

        try {

            
            const transaction = await Transaction.create({
                transactionCode: 'AAAA1', //Random
                date: new Date(),
                amount: 1,
                description: 'Welcome to VBank !',
                type: 'CHARGE',
            })
            
            const accountTrans = await accountTransaction.create({
                role: 'RECEIVER',
                transaction
            })

            const cardCreated = await Card.create({
                cardNumber: await utils.generarCard(),
                startDate: new Date(2021, 10, 27),
                dueDate: new Date(2026,10,27),
                status: 'Blocked',
                cvv: await utils.generarCvv(),
            })
    
    
            const accountCreated = await Account.create({
                cbu: utils.generarCbu(),
                state: true,
                balance: 10000,
                type: 'Caja de ahorro en pesos',
                card: cardCreated._id,
                transactions: accountTrans._id

            })
    
            
            const userCreated = await User.create({
                lastName,
                firstName,
                email,
                username,
                password: HashedPassword,
                dni,
                account: accountCreated._id
            })
    
            cardCreated.account = accountCreated._id
            await cardCreated.save()
    
            accountCreated.user = userCreated._id
            await accountCreated.save()
    
            res.json({status: 'ok', data: userCreated})
        } catch (error) {
            console.log(error)
            res.json({status: 'failed', error: error})
        }
    }
    else {
        res.status(400).json({status: 'failed', data: validation.error})
    }

})

user.post('/login', async (req, res) => {
    const {dni, username, password} = req.body

    const user = await User.findOne({dni, username}).lean()

    if(!user) return res.json({status: 'failed', error: 'Invalid Credentials'})

    // const test = await jwt.verify(token, JWT_SECRET)

    if(await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({id: user._id, username: user.username}, process.env.JWT_SECRET, {expiresIn: '60000'})
        localStorage.setItem('token', token)
        console.log(token)

        //Falta agregar el TOKEN
        res.json({status: 'ok', data: 'User logged in'})
    } else {
        res.json({status: 'failed', data: 'Invalid Credentials'})
    }

})

user.get('/test', async(req,res) => {

   
    try{
        const mail = await email.transporter.sendMail({
            from: 'Remitente',
            to: 'simoncito@hotmail.com', // recuperar desde user
            subject: 'Verification Email',  
            text: 'Codigo de verificacion: ****' // o html 
        })
        
        res.status(200).json({status: 'ok', data: mail })

    } catch (error) {

        emailStatus = error;
        return res.status(400).json({message: 'Something went wrong! '})

    }
})

module.exports = user