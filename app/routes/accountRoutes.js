const express = require("express");
const router = express.Router();
const {account} = require("../controllers/account");
const {isAdmin} = require("../middleware/isAdmin");
const {isSignedIn} = require("../middleware/isSignedIn");

router.post("/accounts", isSignedIn, isAdmin, account);

module.exports = router;
