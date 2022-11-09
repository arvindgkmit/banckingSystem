const express = require("express");
const router = express.Router();
const { body } = require('express-validator');
const {validate} = require("../helper/validation")
const {account, closeAccount} = require("../controllers/account");
const {isAdmin} = require("../middleware/isAdmin");
const {isSignedIn} = require("../middleware/isSignedIn");

// create account route
router.post("/accounts", validate([ body('type', 'Enter a valid type').isIn(['current', 'saving']),
body('userId', 'please  enter valid userId').isLength({ min: 1})]), isSignedIn, isAdmin, account);

// close account route
router.patch("/accounts", validate([ body('accountNo', 'please enter valid accountNo')
.isLength({ min: 8})]), isSignedIn, isAdmin, closeAccount);

module.exports = router;
