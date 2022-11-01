const express = require("express");
const dotenv = require("dotenv");
const db = require("./db");
const user = require("./routes/User");
const account = require("./routes/Accounts");
const transaction = require("./routes/Transaction")
const app = express();
dotenv.config();
app.use(express.json());

app.use("/api", user);
app.use("/api", account);
app.use("/api", transaction);

let port = process.env.PORT;
app.listen(port);

module.exports = app;