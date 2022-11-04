const express = require("express");
const router = express.Router();
const {createUser, login, logout} = require("../controllers/user");
const {isSignedIn} = require("../middleware/isSignedIn");
const {isAdmin} = require("../middleware/isAdmin");

router.post("/users",isSignedIn,isAdmin, createUser);
router.post("/login", login);
router.post("/logout", isSignedIn, logout);

module.exports = router;
