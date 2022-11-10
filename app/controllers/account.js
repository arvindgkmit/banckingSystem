const { createAccount, accountClose } = require("../services/account");

// create user account api 
exports.account = async (req, res) => {
    createAccount(req.body, (result, status_code) => {
        return res.status(status_code).json(result);
    });
}

// close user account api 
exports.closeAccount = async (req, res) => {
    accountClose(req.body, (result, status_code) => {
        return res.status(status_code).json(result);
    });
}



