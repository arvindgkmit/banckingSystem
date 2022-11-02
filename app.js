const express = require("express");
const db = require("./app/models/db");
const app  = express();

// check database connection 
try {
    db.sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

//   sync for create table first time
  const User = db.users;
  User.sync({alter: true});
  console.log("The table for the User model was just (re)created!");

let port = process.env.PORT;
app.listen(port, ()=>{
    console.log("port is running on 3000");
})