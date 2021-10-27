const mongoose = require("mongoose");


const accountSchema = new mongoose.Schema(
    {
        cbu: {
            type: String,
            required: true
        },
        state: {    
            type: Boolean,
            required: true
        },
        balance: {  
            type: Number,
            required: true,
        },

        type: {
            type: String,
            required: true,
        },

        // transactions: {
        //     type: Schema.ObjectId,
        //     ref: 'Transaction'
        // },

        // card: {
        //     type: Schema.ObjectId,
        //     ref: 'Card'
        // }

    },
    {timestamps:true}
)



const Account = mongoose.model("Account", accountSchema);

module.exports = Account;