const express = require('express')
const mongoose = require('mongoose')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Account = require('../models/Account')
const Card = require('../models/Card')

const user = express.Router()
require('dotenv').config()

const utils = require('../utils/utils')


user.post('/register', async (req, res) => {
    const {lastName, firstName, email, username, password, dni} = req.body

    const HashedPassword = await bcrypt.hash(password, 10)

    try {

        const cardCreated = await Card.create({
            cardNumber: utils.generarCard(),
            startDate: new Date(2021, 10, 27),
            dueDate: new Date(2026,10,27),
            status: 'Blocked',
            cvv: 123,
        })


        const accountCreated = await Account.create({
            cbu: utils.generarCbu(),
            state: true,
            balance: 10000,
            type: 'Caja de ahorro en pesos',
            card: cardCreated._id
        })

        
        const userCreated = await User.create({
            lastName,
            firstName,
            email,
            username,
            password: HashedPassword,
            dni,
            accounts: accountCreated._id
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
})

user.post('/login', async (req, res) => {
    const {dni, username, password} = req.body

    const user = await User.findOne({dni, username}).lean()

    if(!user) return res.json({status: 'failed', error: 'Invalid Credentials'})

    // const test = await jwt.verify(token, JWT_SECRET)

    if(await bcrypt.compare(password, user.password)) {
        // const token = await jwt.sign({id: user._id, username: user.username}, process.env.JWT_SECRET, {expiresIn: '40000'})
        // localStorage.setItem('token', token)

        //Falta agregar el TOKEN
        res.json({status: 'ok', data: 'User logged in'})
    } else {
        res.json({status: 'failed', data: 'Inavlid Credentials'})
    }

})


user.get('/test', async(req,res) => {

    const user = await Account.findOne({balance: 1000})

    if (user) {

        res.json(user.cbu)
    } 
    else {

        res.json('err')
    } 
})

module.exports = user