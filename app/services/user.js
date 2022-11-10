const db = require("../models/db");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const hashPassword = require("../helper/hashPassword");
const User = db.users;
const Account = db.accounts;

// user create service
exports.register = async (data, callback) => {
  try {
    let fetchEmail = await User.count({
      where: {
        email: data.email,
      },
    });

    if (fetchEmail) {
      return callback({ message: "user already exist" }, null, 409);
    }

    data.password = await hashPassword.createHash(data.password);
    await User.create(data);
    return callback({ message: "user created successfully" }, null, 201);
  } catch (error) {
    return callback({ error: error }, null, 500);
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
exports.allUsers = async (callback) => {
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

    return callback({ data: userData }, 200);
  } catch (error) {
    return callback({ error: error }, 500);
  }
};

// get single user
exports.singleUser = async (data, callback) => {
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

    return callback({ data: userData }, 200);
  } catch (error) {
    return callback({ error: error }, 500);
  }
};
