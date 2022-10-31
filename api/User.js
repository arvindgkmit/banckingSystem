const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../db");

exports.user = (req, res) => {
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