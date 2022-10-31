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

// deposite amount api  
exports.deposit = (req, res)=>{
    let accountNo = req.body.accountNo;
    let amount = req.body.amount;

    if(amount == ""){
        return res.status(404).json({
            message: "please enter the amount"
        })
    }
     
      try {
         db.query("SELECT amount FROM accounts WHERE accountNo = ? ",[accountNo], (err, result)=>{
              if(result[0].amount.legth == 0){
                return res.status(404).json({
                    message:  "account not exist"
                });
              }
             
            let depositAmount = result[0].amount + amount;
            db.query("UPDATE accounts SET amount = ? WHERE accountNo = ?",[depositAmount, accountNo], (err, result)=>{
            if(err){
               return res.status(404).json({
                message: "please enter amount"
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



