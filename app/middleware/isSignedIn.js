// const dotenv=require('dotenv')
// dotenv.config();
// var { expressjwt: jwt } = require("express-jwt");
// exports.isSignedIn =jwt({
// secret: process.env.SECRET,
// algorithms: ["HS256"],
// userProperty:"auth"
// });

const jwt = require("jsonwebtoken")
require('dotenv').config();

exports.isSignedIn = (req, res, next) => {
    const token = req.cookies['token'];
    if (!token)
        return res.status(400).json({
            "error": "please login"
        })

    jwt.verify(token, process.env.SECRET, (err, result) => {
        if (err) {
            return res.status(401).json({ message: "Invalid token" });
        }
        if (result) {
            console.log(result,"this result")
            req.userId = result.userId;
            console.log(req.userId,"Raghav");
            return next()
        }
    });
}