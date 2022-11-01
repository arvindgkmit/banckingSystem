const express = require("express");
const router = express.Router();
const {addUser, login, logout, updateUser} = require("../api/User")
const {isSignedIn} = require("../middleware/IssignedIn")
const {isAdmin} = require("../middleware/Isadmin")

router.post('/users',isSignedIn, isAdmin, addUser);
router.patch('/users/:userId',isSignedIn, updateUser);
router.post('/login', login);
router.post('/logout', isSignedIn, logout);


module.exports = router;