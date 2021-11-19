const mongoose = require("mongoose");

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
    cvu: {
      type: String
    },
    username: {
      type:String
    }
  }
);

const User = mongoose.model("Contact", contactSchema);

module.exports = User;
