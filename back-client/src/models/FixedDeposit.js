const mongoose = require("mongoose");

const fixedDepositSchema = new mongoose.Schema({
  amount: {
      type: Number,
      required: true,
  },
  startDate: {
    type: Date,
    required: true,
    default: new Date(),
  },
  finishDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["Active", "Received"],
    default: "Active"
  },
  total: {
      type: Number,
      required: true
  },
  account: {
    type: mongoose.Schema.ObjectId,
    ref: "Account",
  },
});

const FixedDeposit = mongoose.model("FixedDeposit", fixedDepositSchema);

module.exports = FixedDeposit;
