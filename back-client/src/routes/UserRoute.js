const express = require('express')
const mongoose = require('mongoose')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const user = express.Router()


user.post('/register', async (req, res) => {
    console.log(req.body)
    const {lastName, firstName, email, username, password: plainTextPassword, dni} = req.body

    const password = await bcrypt.hash(plainTextPassword, 10)

    try {
        const userCreated = await User.create({
            lastName,
            firstName,
            email,
            username,
            password,
            dni
        })

        res.json({status: 'ok', data: userCreated})
    } catch (error) {
        console.log(error)
    }
})

module.exports = user