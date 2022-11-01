const express = require("express");
const dotenv = require("dotenv");
const db = require("./db");
const user = require("./routes/User");
const account = require("./routes/Accounts");
const app = express();
dotenv.config();
app.use(express.json());

app.use("/api", user);
app.use("/api", account);

let port = process.env.PORT;
app.listen(port, ()=>{
    console.log("port is runnnig on 5000");
})

module.exports = app;