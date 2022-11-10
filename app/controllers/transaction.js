const {
  depositAmmount,
  withdrawAmount,
  checkTransaction,
  checkAmount,
  transaction,
} = require("../services/transaction");
const { checkAccountStatus } = require("../services/account");

// deposit api controller
exports.deposit = async (req, res) => {
  let amount = req.body.amount;
  if (amount < 0) {
    return res.status(400).json({ message: "invalid amount" });
  }
  const accountStatus = await checkAccountStatus({ ...req.body });
  if (!accountStatus) {
    return res.status(404).json({ message: "account not found" });
  }

  if (accountStatus.dataValues.status == "inactive") {
    return res.status(400).json({ message: "account is already closed" });
  }
  let getAmount = await checkAmount({ ...req.body, userId: req.userId });

  let deposit = amount + getAmount.amount;

  let isdepositAmmount = depositAmmount({
    ...req.body,
    userId: req.userId,
    deposit: deposit,
  });
  let type = "deposit";
  let myTransaction = await transaction({
    ...req.body,
    userId: req.userId,
    type: type,
  });

  if (myTransaction) {
    return res.status(200).json({ message: "ammount deposit successfully" });
  }
};

// withdraw api controller
exports.withdraw = async (req, res) => {
  let amount = req.body.amount;
  if (amount < 0) {
    return res.status(400).json({ message: "invalid amount" });
  }
  const accountStatus = await checkAccountStatus({ ...req.body });
  if (!accountStatus) {
    return res.status(404).json({ message: "account not found" });
  }

  if (accountStatus.dataValues.status == "inactive") {
    return res.status(400).json({ message: "account is already closed" });
  }
  let getAmount = await checkAmount({ ...req.body, userId: req.userId });
  if (amount > getAmount.amount) {
    return res.status(400).json({ message: "insufficent amount" });
  }

  let withdraw = getAmount.amount - amount;

  let isWithdrawtAmmount = withdrawAmount({
    ...req.body,
    userId: req.userId,
    withdraw: withdraw,
  });
  let type = "withdraw";
  let myTransaction = await transaction({
    ...req.body,
    userId: req.userId,
    type: type,
  });

  if (myTransaction) {
    return res.status(200).json({ message: "ammount withdraw successfully" });
  }
};

// check all transaction api  controller
exports.transaction = async (req, res) => {
  let myTransactions = await checkTransaction({ userId: req.userId });

  if (myTransactions) {
    return res.status(200).json({ data: myTransactions });
  }
};
