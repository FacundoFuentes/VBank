const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema(
  {
    cvu: {
      type: String,
      required: true,
    },
    state: {
      type: Boolean,
      required: true,
    },
    balance: {
      type: Number,
      required: true,
    },

    type: {
      type: String,
      required: true,
    },

    card: {
      type: mongoose.Schema.ObjectId,
      ref: "Card",
    },

    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    transactions: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "AccountTransaction",
      }
    ],
    fixedDeposit: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "fixedDeposit"
      }
    ]
  },
  { timestamps: true }
);

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;
