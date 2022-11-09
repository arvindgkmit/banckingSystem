const db = require("../models/db");
const Transaction = db.transactions;
const Account = db.accounts;

// deposit api 
exports.deposit = async (req, res) => {
      const {accountNo, amount} =req.body;
      let userId = req.userId;
      
      if(!accountNo || !amount ){
        return res.status(400).json({
            message: "please provide all required fields"
        });
      }

      if(amount<0){
        return res.status(400).json({
            message: "invalid amount"
        });
      }

      try {
        
        let checkAccount = await Account.count({
            where: {
                accountNo: accountNo
            }
        })
         
        if(!checkAccount){
            return res.status(404).json({
                message: "account not found"
            })
        }
         
        userData = await Account.findOne({
            where: {
                accountNo: accountNo
            }});   
            let cuurentAmount = userData.amount;
            let updateAmount = cuurentAmount+ amount;

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
                 amount: updateAmount,
                },
                {
                  where: { accountNo: accountNo },
                }
              );
            // console.log("this userid ",userId);
        let data = {
            type: "deposit",
            accountNo: accountNo,
            amount: amount,
            userId: userId
        }
         console.log(data, "this data");
        await Transaction.create(data);
        return res.status(200).json({
            message: "amount deposit successfully"
        })
        
      } catch (error) {
        return res.status(500).json({
            message: "internal server error"
        })
    }
}

// withdraw api 
exports.withdraw = async (req, res) => {
    const {accountNo, amount} =req.body;
    let userId = req.userId;
    
    if(!accountNo || !amount ){
      return res.status(400).json({
          message: "please provide all required fields"
      });
    }

    if(amount<0){
        return res.status(400).json({
            message: "invalid amount"
        });
      }

    try {

        let checkAccount = await Account.count({
            where: {
                accountNo: accountNo
            }
        })
         
        if(!checkAccount){
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
        
        userData = await Account.findOne({
            where: {
                accountNo: accountNo
            }});
              
            let cuurentAmount = userData.amount
            if(cuurentAmount>=amount){

                let updateAmount = cuurentAmount- amount;

                let data = {
                    type: "withdraw",
                    accountNo: accountNo,
                    amount: amount,
                    userId: userId
                  }

                await Transaction.create(data);
                  await Account.update(
                    {
                     amount: updateAmount,
                    },
                    {
                      where: { accountNo: accountNo },
                    }
                  );

                  
                  return res.status(200).json({
                    message: "amount withdraw successfully"
                })

            } else{
                return res.status(400).json({
                    message: "insufficent amount"
                })
            }
      
    } catch (error) {
      return res.status(500).json({
          message: "internal server error"
      })
  }
}

exports.transaction = async (req, res) => {
    let userId =req.userId;
   try {

   let transactions = await Transaction.findAll({
        where: {
            userId: userId
        }});

        return res.status(200).json({
            data: transactions
        }) 
   
   } catch (error) {
       return res.status(500).json({
        message: "internal server error"
    }) 
   }


}

