const express = require("express");
const router = express.Router();
const {isSignedIn} = require("../middleware/IssignedIn")
const {transactions} = require("../api/Transaction");

router.get('/transactions/:userId',isSignedIn, transactions);

module.exports = router;