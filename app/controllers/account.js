const db = require("../models/db");
const Account = db.accounts;
const User = db.users;

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

      let status = "active";
        await Account.create(data);
         await User.update(
            {
                status: "active",
            },
            {
              where: { id: userId },
            }
        );
        return res.status(201).json({
            message: "accounted created successfully"
        })

    }  catch (error) {
        return res.status(500).json({
            message: "internal server error"
        })
    }
    
}

exports.closeAccount = async (req, res)=>{
    // let id = req.params.id;
    let accountNo = req.body.accountNo;
    if(!accountNo){
        return res.status(400).json({
            message: "please enter acountNo"
        }) 
    }

    try {

        let checkAccountStatus = await Account.count({
            where: {
                accountNo: accountNo
            }
        })

        if(!checkAccountStatus){
            return res.status(404).json({
                message: "account not found"
            })
        }
        let getStatus = await Account.findOne({
            where: { accountNo: accountNo },
              attributes: { exclude: ['accountNo', 'type', 'amount', 'userId' ] }
        });
        let currentStatus = getStatus;
        if(currentStatus.dataValues.status == "inactive"){
            return res.status(400).json({
                message: "account is already closed"
            })
        }
         await Account.update(
            {
                status: "Inactive",
            },
            {
              where: { accountNo: accountNo },
            }
            );
            return res.status(200).json({
                message: "account closed successfully"
            })
        
    }  catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "internal server error"
        })
    }

}



