const express = require("express");
const db = require("../db");

// create account for user
exports.accounts = (req, res) => {
   let type = req.body.type;
   let amount  = req.body.amount;
   let userId = req.body.userId;

    if (type == "" || amount == "" || userId == "") {
        return res.status(400).json({
            message: 'please enter all required fileds'
        });
    }
    
    try {
        db.query("INSERT INTO accounts(type, amount, userId) values(?,?,?)", [type, amount, userId], (err, result) => {
            if (err) {
                return res.status(400).json({
                    message: 'please enter all required fileds'
                });
            }
            return res.status(201).json({
                message: 'Account created successfully'
            })
    
        }); 
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
    
}
