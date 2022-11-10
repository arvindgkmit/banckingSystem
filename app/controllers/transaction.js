const { depositAmmount, withdrawAmount, checkTransaction } = require("../services/transaction");

// deposit api
exports.deposit = async (req, res) => {
  depositAmmount({ ...req.body, userId: req.userId }, (result, status_code) => {
    return res.status(status_code).json(result);
  });
};

// withdraw api
exports.withdraw = async (req, res) => {
  withdrawAmount({ ...req.body, userId: req.userId }, (result, status_code) => {
    return res.status(status_code).json(result);
  });
  //   const { accountNo, amount } = req.body;
  //   let userId = req.userId;
};

exports.transaction = async (req, res) => {
  checkTransaction({ userId: req.userId }, (result, status_code) => {
    return res.status(status_code).json(result);
  });
};
