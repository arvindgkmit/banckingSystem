const express = require("express");
const db = require("./app/models/db");
const userRoute = require("./app/routes/userRoute");
const app  = express();
app.use(express.json());

// check database connection 
try {
    db.sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

//   available routes
app.use("/api", userRoute);

 // sync user model in database from model
// let User = db.users;
// User.sync({ alter: true })

// // sync account model in database from model
// let Account = db.accounts;
// Account.sync({ alter: true })

// // sync Transactionss model in database from model
// let Transaction = db.transactions;
// Transaction.sync({ alter: true })

let port = process.env.PORT;
app.listen(port, ()=>{
    console.log("port is running on 3000");
})