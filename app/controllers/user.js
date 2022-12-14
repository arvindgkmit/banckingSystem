
const { register, userLogin, allUsers, singleUser } = require("../services/user");


// create user api 
exports.createUser = (req, res) => {
    const result = register({ ...req.body });
     if (result) {
       return res.status(409).json({ message: "user already exist" });
     }
    
    return callback({ message: "user created successfully" }, 201);
    

}


// user login api  
exports.login = (req, res) => {
    userLogin(req.body, (result, status_code) => {
        console.log(result, "cjf");
        res.cookie("token", result.token, { expire: new Date() + 100000 });
        return res.status(status_code).json(result);
    });
}


// get all users
exports.getAllUsers = async (req, res) => {
    allUsers((result, status_code) => {
        return res.status(status_code).json(result);
    });
}


// get single user
exports.getSingleUsers = async (req, res) => {
    singleUser(req.params, (result, status_code) => {
        return res.status(status_code).json(result);
    });

}


// user logout api 
exports.logout = (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({
            message: "Logout Successfully"
        })
    }
    catch (error) {
        return res.status(500).json({
            message: "internal server error"
        });
    }
}

