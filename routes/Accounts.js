const express = require("express");
const router = express.Router();
const {accounts} = require("../api/Account")
const {isSignedIn} = require("../middleware/IssignedIn")
const {isAdmin} = require("../middleware/Isadmin")

router.post('/accounts',isSignedIn, isAdmin, accounts);

module.exports = router;