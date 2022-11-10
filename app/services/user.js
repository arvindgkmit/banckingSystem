const db = require("../models/db");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const hashPassword = require("../helper/hashPassword");
const User = db.users;
const Account = db.accounts;

// check user already exist or not
exports.checkUser = async (data) => {
  try {
    let fetchEmail = await User.findOne({
      where: {
        email: data.email,
      },
    });
    return fetchEmail;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// user create service
exports.register = async (data) => {
  try {
    data.password = await hashPassword.createHash(data.password);
    let saveData = await User.create(data);
    return saveData ? true : false;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// user login service
exports.userLogin = async (data, callback) => {
  try {
    // check email exist in database  or not
    let checkEmail = await User.count({
      where: {
        email: data.email,
      },
    });

    let userData;
    if (checkEmail) {
      userData = await User.findOne({
        where: {
          email: data.email,
        },
      });
    } else {
      return callback({ message: "user not found" }, 404);
    }

    let verifyPassword = hashPassword.compareHash(
      data.password,
      userData.password
    );
    if (verifyPassword) {
      const data = JSON.stringify({ userId: userData.id });
      const token = jwt.sign(data, process.env.SECRET);
      console.log("fetchEmailfetchEmail", token);
      return callback({ message: "logged in successfully", token: token }, 200);
    } else {
      return callback({ message: "Invalid Credentials" }, 401);
    }
  } catch (error) {
    return callback({ error: error }, 500);
  }
};

// get all users
exports.allUsers = async () => {
  try {
    let userData = await User.findAll({
      attributes: { exclude: ["password"] },
      include: [
        {
          model: Account,
          attributes: { exclude: ["userId"] },
        },
      ],
    });
    return userData;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// get single user
exports.singleUser = async (data) => {
  try {
    let userData = await User.findAll({
      attributes: { exclude: ["password"] },
      include: [
        {
          model: Account,
          attributes: { exclude: ["userId"] },
        },
      ],
      where: {
        id: data.id,
      },
    });
    return userData;
  } catch (error) {
    console.log(error);
    return error;
  }
};
