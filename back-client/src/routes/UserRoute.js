const express = require('express')
const mongoose = require('mongoose')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const user = express.Router()
require('dotenv').config()



user.post('/register', async (req, res) => {
    const {lastName, firstName, email, username, password, dni} = req.body

    const HashedPassword = await bcrypt.hash(password, 10)

    try {
        const userCreated = await User.create({
            lastName,
            firstName,
            email,
            username,
            password: HashedPassword,
            dni
        })
        const token = jwt.sign({id: user._id, username: user.username}, process.env.JWT_SECRET, {expiresIn: '60000'})

        res.json({status: 'ok', data: userCreated, token: token})
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
        const token = jwt.sign({id: user._id, username: user.username}, process.env.JWT_SECRET, {expiresIn: '60000'})
        localStorage.setItem('token', token)
        console.log(token)

        //Falta agregar el TOKEN
        res.json({status: 'ok', data: 'User logged in'})
    } else {
        res.json({status: 'failed', data: 'Invalid Credentials'})
    }

})

module.exports = user