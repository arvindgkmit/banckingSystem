const express = require("express");
const { body } = require('express-validator');
const {validate} = require("../helper/validation")
const router = express.Router();
const {createUser, login, logout, getAllUsers, getSingleUsers} = require("../controllers/user");
const {isSignedIn} = require("../middleware/isSignedIn");
const {isAdmin} = require("../middleware/isAdmin");

// create user route
router.post("/users", validate([ body('name', 'please enter vaild name').isLength({ min: 2 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be atleast 5 characters').isLength({ min: 5 })]),
  isSignedIn,isAdmin,createUser);

// get all users route
router.get("/users",isSignedIn,isAdmin, getAllUsers);

// get single user route
router.get("/users/:id",isSignedIn,isAdmin, getSingleUsers);

// login route
router.post("/login", validate([ body('email', 'Enter a valid email').isEmail(),
body('password', 'Password must be atleast 5 characters').isLength({ min: 5 })]), login);

// logout route
router.post("/logout", isSignedIn, logout);

module.exports = router;
