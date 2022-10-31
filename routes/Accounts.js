const express = require("express");
const router = express.Router();
const {accounts,deposit} = require("../api/Account")
const {isSignedIn} = require("../middleware/IssignedIn")
const {isAdmin} = require("../middleware/Isadmin")

router.post('/accounts',isSignedIn, isAdmin, accounts);
router.patch('/deposit',isSignedIn, deposit);

module.exports = router;