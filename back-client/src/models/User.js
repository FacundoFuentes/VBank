const mongoose = require("mongoose");
const validator = require('validator')

// Agregar ADDRESS;

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

    dni: {
      type: Number,
      required: true,
    },

    // birthDate: {
    //     type: Date,
    // },

    accounts: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account'
      }
    
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
