const db = require("../models/db");
const Transaction = db.transactions;
const Account = db.accounts;

// check ammount
exports.checkAmount = async (data) => {
  accountData = await Account.findOne({
    where: {
      accountNo: data.accountNo,
    },
  });

  return accountData;
};

// deposit transaction
exports.transaction = async (data) => {
  try {
    let myTransaction = await Transaction.create(data);
    console.log("myTransactionmyTransaction", myTransaction);
    return myTransaction;
  } catch (error) {
    return error;
  }
};

// deposit amount service
exports.depositAmmount = async (data) => {
  try {
    let ammountDeposite = await Account.update(
      {
        amount: data.deposit,
      },
      {
        where: { accountNo: data.accountNo },
      }
    );
    return ammountDeposite;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// withdraw amount service
exports.withdrawAmount = async (data, callback) => {
  try {
    let amountWithdraw = await Account.update(
      { amount: data.withdraw },
      { where: { accountNo: data.accountNo } }
    );
    console.log("amountWithdrawamountWithdraw", amountWithdraw);
    return amountWithdraw;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// check transaction service
exports.checkTransaction = async (data) => {
  try {
    let transactions = await Transaction.findAll({
      where: {
        userId: data.userId,
      },
    });
    return transactions;
  } catch (error) {
    console.log(error);
    return error;
  }
};
