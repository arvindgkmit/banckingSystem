const {
  createAccount,
  accountClose,
  findUserId,
  checkAccountStatus,
} = require("../services/account");

// create user account api
exports.account = async (req, res) => {
  const findUser = await findUserId({ ...req.body });
  if (!findUser) {
    return res.status(404).json({ message: "user not found" });
  }

  const isAccountCreated = await createAccount({ ...req.body });
  if (isAccountCreated) {
    return res.status(201).json({ message: "Account created successfully" });
  }
};

// close user account api
exports.closeAccount = async (req, res) => {
  const accountStatus = await checkAccountStatus({ ...req.body });
  if (!accountStatus) {
    return res.status(404).json({ message: "account not found" });
  }

  if (accountStatus.dataValues.status == "inactive") {
    return res.status(400).json({ message: "account is already closed" });
  }

  const isAccountClosed = await accountClose({ ...req.body });

  if (isAccountClosed) {
    return res.status(200).json({ message: "account is closed" });
  }
};
