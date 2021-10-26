const mongoose = require("mongoose");

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
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
