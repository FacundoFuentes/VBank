const { Router } = require("express");
const UserRoute = require("./UserRoute");
const TransactionRoute = require("./TransactionRoute");
const utils = require("./Utils.js");
const statistics = require("./Statistics.js");
const schedule = require("node-schedule")
const fixedDeposit = require("./FixedDepositRoute.js");

const router = Router();

router.use("/user", UserRoute);
router.use("/fixedDeposit", fixedDeposit);
router.use("/statistics", statistics);
router.use("/transactions", TransactionRoute);
router.use("/clearDB", utils);

module.exports = router;
