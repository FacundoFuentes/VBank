const express = require("express");
const mongoose = require("mongoose");
const Card = require("../models/Card.js");
const bcrypt = require("bcrypt");

const card = express.Router();

function generateCardNumber() {
  return (
    "4" +
    "47526" +
    Math.floor(Math.random() * 9999999999) // Número random de 10 dígitos
      .toString()
      // Si no llega  a 10, se rellena con 0
      .padStart(9, "0")
  );
}

card.get("/", async (req, res) => {
  // Debería buscar las tarjetas de una cuenta, o lo que sea dependiendo de cómo lo
  const { account } = req.body; 
  try {
    const findCards = await Card.find({ account });
    res.json({ status: "ok", data: findCards });
  } catch (error) {
    res.json({ status: "failed", data: error });
  }
});

card.post("", async (req, res) => {
  const cardNumber = generateCardNumber();

  let CVV = Math.floor((Math.random() * 999).toString().padStart("1"));

  try {
    CVV = await bcrypt.hash(CVV, 10);

    const createdCard = await Card.create({
      cardNumber,
      status: "Active",
      CVV,
    });

    res.json({ status: "ok", data: createdCard });

  } catch (error) {
    res.json({ status: "failed", data: error });
  }
});
