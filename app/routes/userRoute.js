const express = require("express");
const router = express.Router();
const {createUser, login, logout} = require("../controllers/userController");
const {isSignedIn} = require("../middleware/isSignedIn");

router.post("/users", createUser);
router.post("/login", login);
router.post("/logout", isSignedIn, logout);

module.exports = router;
