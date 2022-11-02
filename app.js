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

let port = process.env.PORT;
app.listen(port, ()=>{
    console.log("port is running on 3000");
})