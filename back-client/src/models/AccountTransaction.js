const mongoose = require('mongoose')

const AccountTransactionSchema = new mongoose.Schema({
    role: {
        type: String,
        enum: ['SENDER', 'RECEIVER']
    },

    transaction: {
        type: mongoose.Schema.ObjectId,
        ref: 'Transaction'
    },


})

const AccountTransaction = mongoose.model("AccountTransaction", AccountTransactionSchema);

module.exports = AccountTransaction;