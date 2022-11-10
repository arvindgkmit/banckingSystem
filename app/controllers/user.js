const {
  register,
  userLogin,
  allUsers,
  singleUser,
  checkUser,
} = require("../services/user");

// create user api
exports.createUser = async (req, res) => {
  const userData = await checkUser({ ...req.body });
  if (userData) {
    return res.status(409).json({ message: "user already exist" });
  }

  const isUserCreated = await register({ ...req.body });
  if (isUserCreated) {
    return res.status(201).json({ message: "user created successfully" });
  }
};

// user login api
exports.login = async (req, res) => {
  userLogin(req.body, (result, status_code) => {
    console.log(result, "cjf");
    res.cookie("token", result.token, { expire: new Date() + 100000 });
    return res.status(status_code).json(result);
  });
};

// get all users
exports.getAllUsers = async (req, res) => {
  let allUsersData = await allUsers();
  return res.status(200).json({ data: allUsersData });
};

// get single user
exports.getSingleUsers = async (req, res) => {
  let myData = await singleUser(req.params);
  return res.status(200).json({ data: myData });
};

// user logout api
exports.logout = (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({
      message: "Logout Successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "internal server error",
    });
  }
};
