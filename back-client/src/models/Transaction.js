const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
    transactionCode: {
        type: String,
        required: true,
        trim: true
    }, 

    amount: {
        type: Number,
        required: true,
    },

    description: {
        type: String,
        required: true,
        trim: true
    },

    type: {
        type: String,
        enum: ['TRANSFER', 'CHARGE', 'REFUND']
    },

    status: {
        type: String,
        enum: ['PROCESSING', 'CONFIRMED', 'CANCELLED']
    }
})