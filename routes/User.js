const express = require("express");
const router = express.Router();
const {user, login, logout} = require("../api/User")
const {isSignedIn} = require("../middleware/IssignedIn")
const {isAdmin} = require("../middleware/Isadmin")

router.post('/users',isSignedIn, isAdmin, user);
router.post('/login', login);
router.post('/logout', isSignedIn, logout);


module.exports = router;