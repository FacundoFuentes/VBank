const { Router } = require("express");
const UserRoute = require("./UserRoute");
const TransactionRoute = require("./TransactionRoute");
const utils = require("./Utils.js");
const statistics = require("./Statistics.js");
const fixedDeposit = require("./FixedDepositRoute.js");
const schedule = require("node-schedule")
const FixedDeposit = require("../models/FixedDeposit.js")
const Account = require("../models/Account.js")

// Se ejecuta todos los días a las 00:00 y checkea los plazos fijos que se vencen el día actual
schedule.scheduleJob("0 0 * * *", async () => {
    console.log("*** EJECUTANDO CHECKEO DE PLAZOS FIJOS ***")
    try {
        let fixedDeposits = await FixedDeposit.find({});
        const todayDate = new Date();
        for (let i = 0; i < fixedDeposits.length; i++) {
            if (fixedDeposits[i].finishDate <= todayDate) {
                fixedDeposits[i].status = "Received";
                const accountFound = await Account.findOne({_id: fixedDeposits[i].account})
                accountFound.balance += fixedDeposits[i].amount * (1 + fixedDeposits[i].interestRate)
                await accountFound.save()
                await fixedDeposits[i].save();
              }
        }
        console.log("*** CHECKEO DE PLAZOS FIJOS FINALIZADO CORRECTAMENTE ***")
    } catch (error) {
        console.log("Error checking for fixed deposits due", error)
    }
});

const router = Router();

router.use("/user", UserRoute);
router.use("/fixedDeposit", fixedDeposit);
router.use("/statistics", statistics);
router.use("/transactions", TransactionRoute);
router.use("/clearDB", utils);

module.exports = router;
