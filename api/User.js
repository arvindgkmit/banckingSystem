const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const db = require("../db");

// add user api  
exports.addUser = (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;

    if (name == "" || email == "" || password == "") {
        return res.status(400).json({
            message: "plesae enter all required fields"
        });
    }

    let hash_pass = bcrypt.hashSync(password, 10);
    try {
        db.query("INSERT INTO users(name, email, password) values (?,?,?)", [name, email, hash_pass], (err, result) => {
            if (err) {
                return res.status(400).json({
                    message: "plesae enter all required fields"
                });
            }

            return res.status(201).json({
                message: "user added successfully"
            });

        })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

}


// user login api 

exports.login = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (email == "" || password == "") {
        return res.status(400).json({
            message: "please enter all the required fields"
        });
    }

    try {
        db.query("SELECT * FROM users WHERE email = ?", [email], (err, result) => {
            if (err) {
                return res.status(400).json({
                    message: "please enter all the required fields"
                });
            }

            if (result.length == 0) {
                return res.status(404).json({
                    message: "user not found"
                });
            }

            let verify_pass = bcrypt.compareSync(password, result[0].password);
            if (verify_pass) {
                const token = jwt.sign(result[0].id, process.env.SECRET);
                res.cookie("token", token, { expire: new Date() + 100000 });
                return res.status(200).json({
                    message: "login successfully",
                    token: token
                });
            }
            else {
                return res.status(400).json({
                    message: "incorrect password"
                });
            }

        })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

}


// user logout api
exports.logout = (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({
            message: "Logout Successfully"
        })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

}