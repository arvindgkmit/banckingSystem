const db = require("../models/db");
const Account = db.accounts;

// create user account api 
exports.account = async (req, res)=>{
    const{ type, amount, userId} = req.body;
    if ( !type || !amount || !userId) {
        return res.status(400).json({
            message: "please provide all required fields"
        })
    }

    try {
        let data = {
            type: type,
            amount: amount,
            userId: userId
        }
        
        await Account.create(data);
        return res.status(201).json({
            message: "accounted created successfully"
        })

    } catch (error) {
        
    }
    
}



