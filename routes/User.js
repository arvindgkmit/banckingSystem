const express = require("express");
const router = express.Router();
const {addUser, login, logout, updateUser, closeAccount,getAllUser,getUser} = require("../api/User")
const {isSignedIn} = require("../middleware/IssignedIn")
const {isAdmin} = require("../middleware/Isadmin")

router.post('/users',isSignedIn, isAdmin, addUser);
router.get('/users',isSignedIn, isAdmin, getAllUser);
router.get('/users/:userId',isSignedIn, getUser);
router.delete('/users/:userId',isSignedIn, isAdmin, closeAccount);
router.post('/login', login);
router.post('/logout', isSignedIn, logout);


module.exports = router;