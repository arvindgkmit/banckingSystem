const db = require("../models/db")
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv")
var validator = require("email-validator");
const User = db.users;
const Account = db.accounts;


// create user api 
exports.createUser = async (req, res) => {
    const { name, email, password } = req.body;
    let hashPassword = bcrypt.hashSync(password, 10);

    if (!name || !email || !password) {
        return res.status(400).json({
            message: "please provide all required fields"
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


// user login api  
exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (email == "" || password == "" || !email || !password) {
        return res.status(400).json({
            message: "please provide all required fields and their value"
        })
    }

    try {
        // check email exist in database  or not 
        let checkEmail = await User.count({
            where: {
                email: email
            }
        })
       
        let userData;
        if (checkEmail) {
            userData = await User.findOne({
                where: {
                    email: email
                }});
        } else {
            return res.status(404).json({
                message: "user not found"
            })
        }
        console.log("userData", userData);

        let verifyPassword = bcrypt.compareSync(password, userData.password);

        if (verifyPassword) {

            const token = jwt.sign({userId:userData.id}, process.env.SECRET);
            res.cookie("token", token, { expire: new Date() + 100000 });

            return res.status(200).json({
                message: "logged in successfully",
                token: token
            });

        } else {
            return res.status(200).json({
                message: "Invalid Credentials"
            });
        }

    } catch (error) {

        console.log(error)
        return res.status(500).json({
            message: error
        });
    }

}


// user logout api 
exports.logout = (req, res) => {
    try {
        res.clearCookie("token");
        // console.log(res.cookie("token"));
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


exports.getAllUsers = async (req, res) => {
    
    try {
        let users = await User.findAll({
            attributes: { exclude: ['password' ] }
        });

        let final_output = []

        for(let user of users){
            let accounts = await Account.findAll({where : {
                userId: user.id
            }})
         
            let output = {
                user: user,
                accounts: accounts
            }

            final_output.push(output)
        }
        
        return res.status(200).json({
           data: final_output
        });
        
    } catch (error) {
        console.log("errorororoor", error)
        return res.status(500).json({
            message: "internal server error"
        });
    }
}
  

// exports.getSingleUsers = async (req, res) => {
//     let userId = req.params.id;
//     try {
//         let users = await User.findOne({
//             where: {
//              id: userId
//             },
//             attributes: { exclude: ['password' ] }
//         });
//          console.log(users);
//         let final_output = []


//             let accounts = await Account.findAll({where : {
//                 userId: user.id
//             }})

//          for(let account of accounts){
            

//             let output = {
//                 user: user,
//                 accounts: accounts
//             }

//             final_output.push(output)
//         // }
        
//         return res.status(200).json({
//            data: final_output
//         });
        
//     } catch (error) {
//         console.log("errorororoor", error)
//         return res.status(500).json({
//             message: "internal server error"
//         });
//     }
// }
  
exports.getSingleUsers = async (req, res) => {
    let userId = req.params.id;
    console
    try {
        userData = await Account.findAll({
            where: {
                userId: userId
            }});
           console.log("dagjha", userData);
            return res.status(200).json({
                data: userData
            });
        
    } catch (error) {
        return res.status(500).json({
            message: "internal server error"
        });
    }

}

