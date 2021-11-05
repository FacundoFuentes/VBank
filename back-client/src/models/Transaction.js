const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({

    transactionCode: {
        type: String,
        required: true,
        trim: true
    }, 

    date: {
        type: Date,
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
        enum: ['TRANSFER', 'CHARGE', 'REFUND', 'FIXED DEPOSIT']
    },

    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    branch: {
        type: String,
        default: 'other'
    }
})

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;