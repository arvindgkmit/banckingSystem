const express = require("express");
const db = require("../db");

// create account for user
exports.accounts = (req, res) => {
    let type = req.body.type;
    let amount = req.body.amount;
    let userId = req.body.userId;

    if (type == "" || amount == "" || userId == "") {
        return res.status(400).json({
            message: 'please enter all required fileds'
        });
    }

    try {
        db.query("INSERT INTO accounts(type, amount, userId) values(?,?,?)",
         [type, amount, userId], (err, result) => {

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

// deposite amount api  
exports.deposit = (req, res) => {
    let accountNo = req.body.accountNo;
    let amount = req.body.amount;

    if (amount == "" || accountNo == "") {
        return res.status(400).json({
            message: "please all required details"
        })
    }

    try {
        db.query("SELECT amount FROM accounts WHERE accountNo = ? ", 
        [accountNo], (err, result) => {

            if (result[0].amount.legth == 0) {
                return res.status(404).json({
                    message: "account not exist"
                });
            }

            let depositAmount = result[0].amount + amount;
            db.query("UPDATE accounts SET amount = ? WHERE accountNo = ?",
             [depositAmount, accountNo], (err, result) => {

                if (err) {
                    return res.status(404).json({
                        message: "please all required details"
                    });
                }
                return res.status(200).json({
                    message: " amount deposit successfully"
                })
            });

        })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
}


// amount Withdraw api 

exports.withdraw = (req, res) => {
    let accountNo = req.body.accountNo;
    let userId = req.auth;
    let amount = req.body.amount;
    console.log(userId);
    if (amount == "") {
        return res.status(400).json({
            message: "please all  required details"
        })
    }
    //  if(userId){
    try {
        db.query("SELECT amount, userId FROM accounts WHERE (accountNo = ?  AND userId = ? )",
         [accountNo, userId], (err, result) => {
            if (result[0].userId == userId) {
                if (result[0].amount.legth == 0) {
                    return res.status(404).json({
                        message: "account not exist"
                    });
                }
                if (result[0].amount >= amount) {
                    let depositAmount = result[0].amount - amount;
                    db.query("UPDATE accounts SET amount = ? WHERE (accountNo = ? AND userId = ?)",
                     [depositAmount, accountNo, userId], (err, result) => {

                        if (err) {
                            return res.status(404).json({
                                message: "please enter amount"
                            });
                        }

                        return res.status(200).json({
                            message: " amount withdraw successfully"
                        })

                    });
                }

                else {
                    return res.status(400).json({
                        message: "insufficient balance"
                    })
                }
            } else {
                return res.status(401).json({
                    message: "unautherized user"
                })
            }

        })


    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

}
