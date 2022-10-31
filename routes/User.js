const express = require("express");
const router = express.Router();
const {user} = require("../api/User")

router.post('/users',user);


module.exports = router;