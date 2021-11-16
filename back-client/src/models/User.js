const mongoose = require("mongoose");
const validator = require('validator')

const userSchema = new mongoose.Schema(
  {
    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email invalid");
        }
      },
    },
    
    username: {
      type: String,
      required: true,
      trim: true
    },


    password: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (value.length < 6) {
          throw new Error("The password is to short");
        }
        if (value.includes("password")) {
          throw new Error("Invalid password");
        }
      },
    },

    validationCode: {
      type: String,
      required: true,
      trim: true 
    },

    dni: {
      type: Number,
      required: true,
    },

    birthDate: { //Recently added
        type: Date,
    },

    adress: { //Recently added
      type: String,
    },

    phoneNumber: { //Recently added
      type: Number,
    },

    zipCode: { //Recently added
      type: Number
    },

    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
      },

    contacts:
    [
      {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Contact'
      }
    ], 
    status: {
      type: String,
      required: true,
      default: "WAITING EMAIL VERIFICATION",
      enum: ["WAITING EMAIL VERIFICATION", "ACTIVE", "BAN"]
    },
    failedAccessAtemps: {
      type: Number,
      default: 0
    }
    
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
