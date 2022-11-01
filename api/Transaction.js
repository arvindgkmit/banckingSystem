const express = require("express");
const db = require("../db");

// get my transaction
exports.transactions = (req, res) => {
    let userId = req.params.userId;
    try {
        db.query(` SELECT accounts.userId, transaction.type,
        transaction.amount, transaction.status, transaction.dateTime FROM accounts INNER JOIN 
        transaction ON accounts.accountNo = transaction.accountNo  WHERE accounts.userId = ? `,
            [userId],
            (err, result) => {
                return res.status(200).json({
                    data: result
                })

            })

    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
}