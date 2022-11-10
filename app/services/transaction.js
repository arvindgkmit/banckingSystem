const db = require("../models/db");
const Transaction = db.transactions;
const Account = db.accounts;

// deposit amount service
exports.depositAmmount = async (data, callback) => {
  if (data.amount < 0) {
    return callback({ message: "invalid amount" }, 400);
  }
  try {
    let checkAccount = await Account.count({
      where: {
        accountNo: data.accountNo,
      },
    });

    if (!checkAccount) {
      return callback({ message: "account not found" }, 404);
    }
    userData = await Account.findOne({
      where: {
        accountNo: data.accountNo,
      },
    });
    let cuurentAmount = userData.amount;
    let updateAmount = cuurentAmount + data.amount;

    let getStatus = await Account.findOne({
      where: { accountNo: data.accountNo },
      attributes: { exclude: ["accountNo", "type", "amount", "userId"] },
    });

    let currentStatus = getStatus;
    if (currentStatus.dataValues.status == "inactive") {
      return callback({ message: "account is closed" }, 400);
    }
    await Account.update(
      {
        amount: updateAmount,
      },
      {
        where: { accountNo: data.accountNo },
      }
    );
    data.type = "deposit";
    await Transaction.create(data);
    return callback({ message: "amount deposit successfully" }, 200);
  } catch (error) {
    return callback({ message: "internal server error" }, 500);
  }
};

// withdraw amount service
exports.withdrawAmount = async (data, callback) => {
  if (data.amount < 0) {
    return res.status(400).json({
      message: "invalid amount",
    });
  }
  try {
    let checkAccount = await Account.count({
      where: {
        accountNo: data.accountNo,
      },
    });

    if (!checkAccount) {
      return callback({ message: "account not found" }, 404);
    }

    let getStatus = await Account.findOne({
      where: { accountNo: data.accountNo },
      attributes: { exclude: ["accountNo", "type", "amount", "userId"] },
    });

    let currentStatus = getStatus;
    if (currentStatus.dataValues.status == "inactive") {
      return callback({ message: "account is already closed" }, 400);
    }

    userData = await Account.findOne({
      where: {
        accountNo: data.accountNo,
      },
    });

    let cuurentAmount = userData.amount;
    if (cuurentAmount >= data.amount) {
      let updateAmount = cuurentAmount - data.amount;

      //   let data = {
      //     type: "withdraw",
      //     accountNo: accountNo,
      //     amount: amount,
      //     userId: userId,
      //   };
      data.type = "withdraw";
      await Transaction.create(data);
      await Account.update(
        {
          amount: updateAmount,
        },
        {
          where: { accountNo: data.accountNo },
        }
      );
      return callback({ message: "amount withdraw successfully" }, 200);
    } else {
      return callback({ message: "insufficent amount" }, 400);
    }
  } catch (error) {
    return callback({ message: "internal server error" }, 500);
  }
};

// check transaction service
exports.checkTransaction = async (data, callback) => {
  try {
    let transactions = await Transaction.findAll({
      where: {
        userId: data.userId,
      },
    });
    return callback({ data: transactions }, 200);
  } catch (error) {
    return callback({ message: "internal server error" }, 500);
  }
};
