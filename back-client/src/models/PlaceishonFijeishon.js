const mongoose = require("mongoose");

function calculateFinishDate() {
    let actualDate = new Date();
    return new Date(
      actualDate.getFullYear() + 1,
      actualDate.getMonth(),
      actualDate.getDay()
    );
  }

const plazoSchema = new mongoose.Schema({
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
    default: calculateFinishDate(),
  },
  status: {
    type: String,
    enum: ["Active", "Finished", "Cobraded"],
  },
  interes: {
      type: Number,
      required: true
  },
  account: {
    type: mongoose.Schema.ObjectId,
    ref: "Account",
  },
});

const Plazo = mongoose.model("Plazo", plazoSchema);

module.exports = Plazo;
