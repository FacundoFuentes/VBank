const express = require("express");
const statistics = express.Router();
const Transaction = require("../models/Transaction");

statistics.get("/month", async (req, res) => {
  const { month } = req.body;
  const filteredTransactions = await Transaction.find({
    $expr: {
      $eq: [{ $month: "$date" }, month],
    },
  });
  if(!filteredTransactions) return res.status(404).json({status: 'failed', data: 'Transaction not found'})
  res.json(filteredTransactions);
});

statistics.get("/year", async (req, res) => {
  const { year } = req.body;
  const filteredTransactions = await Transaction.find({
    $expr: {
      $eq: [{ $year: "$date" }, year],
    },
  });
  if(!filteredTransactions) return res.status(404).json({status: 'failed', data: 'Transaction not found'})
  res.json(filteredTransactions);
});

statistics.get("/dayOfWeek", async (req, res) => {
  const { dayOfWeek } = req.body;
  const filteredTransactions = await Transaction.find({
    $expr: {
      $eq: [{ $dayOfWeek: "$date" }, dayOfWeek],
    },
  });
  res.json(filteredTransactions);
});

// await Transaction.find({
//     $expr: {
//       $or: [
//         {
//           $and: [{ $eq: [{ $month: "$date" }], 10 }],
//         },
//       ],
//     },
//   });

module.exports = statistics;
