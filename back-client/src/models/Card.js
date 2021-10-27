const mongoose = require('mongoose')

function calculateDueDate(){
    let actualDate = new Date()
    return new Date(actualDate.getFullYear() + 5, actualDate.getMonth(), actualDate.getDay())
}

const cardSchema = new mongoose.Schema({
    cardNumber: {
        type: Number,
        required: true,
        validate: (value) => {
            value.toString().length === 16
        }
    },
    startDate: {
        type: Date,
        required: true,
        default: new Date()
    },
    dueDate:{
        type: Date,
        required: true,
        default: calculateDueDate()
    },
    status:{
        type: String,
        enum: ['Active', 'Expired', 'Blocked',]
    },
    CVV: {
        type: Number,
        required: true,
        validate: (value) => {
            value < 1000 && value > 0
        }
    },
    account: {
        type: mongoose.Schema.ObjectId,
        ref: 'Account'
    }
})


const Card = mongoose.model('Card', cardSchema)


module.exports = Card