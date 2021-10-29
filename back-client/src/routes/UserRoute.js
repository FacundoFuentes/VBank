const express = require('express')
const mongoose = require('mongoose')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const user = express.Router()
const {getToken} = require('../utils/utils')
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
            passwordHash: HashedPassword,
            dni
        })
      /*   const token = jwt.sign({id: user._id, username: user.username}, process.env.JWT_SECRET, {expiresIn: '60000'}) */

        res.json({status: 'ok', data: userCreated, /* token: token */})
    } catch (error) {
        console.log(error)
        res.json({status: 'failed', error: error})
    }
})

user.post('/login', async (req, res) => {
    const {dni, username, password} = req.body

    const user = await User.findOne({dni, username}).lean()

    if(!user) return res.json({status: 'failed', error: 'User not Found'})

        // organice un poco mas el codigo, la funcionalidad es la misma
    const checkPwMatch= await bcrypt.compare(
        password,
        user.passwordHash)

    if (!checkPwMatch){
        return res.status(401).send([{param:"signinError", msg:"Incorrect email or password"}])

    }
    // uso destructuring para remover un campo de un objeto
   const {_id,passwordHash,createdAt,updatedAt,...userWithoutPw}= user; // esto es para no enviar la contraseña al front
   res.send({
    ...userWithoutPw, token: getToken(userWithoutPw)
}

   );
  

   

})

module.exports = user