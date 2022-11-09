const db = require("../models/db");
const Account = db.accounts;
const User = db.users;

// create account service
exports.createAccount = async (data, callback) =>{
    try {
        
        let checkUser = await User.count({
            where: {
                id: data.userId
            }
        })
         
        if(!checkUser){
            return callback({message: "user not found"}, 404)
        }

        let userData = {
            type: data.type,
            amount: 00,
            userId: data.userId
        }

      let status = "active";
        await Account.create(userData);
         await User.update(
            {
                status: "active",
            },
            {
              where: { id: data.userId },
            }
        );
        return callback({message: "accounted created successfully"}, 201)
        
    }  catch (error) {
        return callback({ error: error }, 500)
    }

}


// close account service
exports.accountClose = async (data, callback) => {
    try {

        let checkAccountStatus = await Account.count({
            where: {
                accountNo: data.accountNo
            }
        })

        if(!checkAccountStatus){
            return callback({message: "account not found"}, 404)
        }

        let getStatus = await Account.findOne({
            where: { accountNo: data.accountNo },
              attributes: { exclude: ['accountNo', 'type', 'amount', 'userId' ] }
        });

        let currentStatus = getStatus;
        if(currentStatus.dataValues.status == "inactive"){
            return callback({ message: "account is already closed"}, 400)
        }
         await Account.update({
                status: "Inactive",
            },
            {
              where: { accountNo: data.accountNo },
            });
            return callback({ message: "account closed successfully"}, 200);
        
    }  catch (error) {
        return callback({message: "internal server error"}, 500);
    }

}




