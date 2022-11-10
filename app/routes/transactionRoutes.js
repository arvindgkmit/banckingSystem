const express = require("express");
const router = express.Router();
const { body } = require('express-validator');
const {validate} = require("../helper/validation")
const {deposit, withdraw, transaction} = require("../controllers/transaction");
const {isSignedIn} = require("../middleware/isSignedIn");

// deposit ammount route
router.post("/deposit", validate([ body('accountNo', 'please enter valid accountNo')
.isLength({ min: 8}), body('amount', 'please enter valid amount').isInt()]), isSignedIn, deposit);

// withdraw ammount route
router.post("/withdraw", validate([ body('accountNo', 'please enter valid accountNo')
.isLength({ min: 8}), body('amount', 'please enter valid amount').isInt()]), isSignedIn, withdraw);

// transactions api route
router.get("/transactions", isSignedIn, transaction);

module.exports = router;