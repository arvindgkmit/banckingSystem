// const db = require("../db")

// exports.isEmailExist = (req, res, next) => {
// 	let email = req.body.email
// 	db.query("select * from User where email = ?", [email], (err, result) => {
// 		if (err) {
// 			return res.status(500).json({
// 				error: "Internal server error",
// 			})
// 		}

// 		if (result.length > 0) {
// 			return res.status(409).json({
// 				message: "account already exist please login",
// 			})
// 		}
// 		next()
// 	})
// }