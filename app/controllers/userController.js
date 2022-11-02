const db = require("../models/db")
const bcrypt = require("bcrypt");
var validator = require("email-validator");
const User = db.users;


// create user api 
exports.createUser = async (req, res) => {
    const { name, email, password } = req.body;
    let hashPassword = bcrypt.hashSync(password, 10);

    if (name == "" || email == "" || password == "" || !name || !email || !password) {
        return res.status(400).json({
            message: "please provide all required fields and their value"
        })
    }
    // check email is vaild or not 
    if (!validator.validate(email)) {
        return res.status(400).json({
            message: "please enter vaild email"
        })
    }

    try {

        let fetchEmail = await User.count({
            where: {
                email: email
            }
        })
        console.log("fetchEmail", fetchEmail);
        if (fetchEmail) {
            return res.status(409).json({
                message: "user is already exist"
            })
        }

        let data = {
            name: name,
            email: email,
            password: hashPassword
        }

        await User.create(data);
        return res.status(201).json({
            message: "user created successfully"
        })

    } catch (error) {
        return res.status(500).json({
            message: "internal server error"
        })
    }

}