const mongoose = require("mongoose");
const validator = require('validator')

const contactSchema = new mongoose.Schema(
  {
    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
  }
);

const User = mongoose.model("Contact", contactSchema);

module.exports = User;
