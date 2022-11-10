const db = require("../models/db");
const Account = db.accounts;
const User = db.users;

// check user by id
exports.findUserId = async (data) => {
  try {
    let findUser = await User.findOne({
      where: {
        id: data.userId,
      },
    });
    return findUser;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// create account service
exports.createAccount = async (data, callback) => {
  try {
    data.amount = 0;
    let accountData = await Account.create(data);
    return accountData ? true : false;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// check account status
exports.checkAccountStatus = async (data) => {
  try {
    let getStatus = await Account.findOne({
      where: { accountNo: data.accountNo },
      attributes: { exclude: ["accountNo", "type", "amount", "userId"] },
    });
    return getStatus;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// close account service
exports.accountClose = async (data) => {
  try {
    let closeAccount = await Account.update(
      {
        status: "Inactive",
      },
      {
        where: { accountNo: data.accountNo },
      }
    );
    return closeAccount;
  } catch (error) {
    console.log(error);
    return error;
  }
};
