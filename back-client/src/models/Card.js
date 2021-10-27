const mongoose = require('mongoose')

const cardSchema = new mongoose.Schema({
    cardNumber: {
        type: String,
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    dueDate:{
        type: Date,
        required: true,
    },
    status:{
        type: String,
        enum: ['Active', 'Expired', 'Blocked',]
    },
    cvv: {
        type: Number,
        required: true
    },
    account: {
        type: mongoose.Schema.ObjectId,
        ref: 'Account'
    }
})


const Card = mongoose.model('Card', cardSchema)


module.exports = Card