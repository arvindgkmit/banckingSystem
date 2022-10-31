const express = require("express");
const router = express.Router();
const {accounts,deposit, withdraw} = require("../api/Account")
const {isSignedIn} = require("../middleware/IssignedIn")
const {isAdmin} = require("../middleware/Isadmin")

router.post('/accounts',isSignedIn, isAdmin, accounts);
router.patch('/deposit',isSignedIn, deposit);
router.patch('/withdraw',isSignedIn, withdraw);

module.exports = router;