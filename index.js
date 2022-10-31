const express = require("express");
const dotenv = require("dotenv");
const db = require("./db");
const router = require("./routes/User");
const app = express();
dotenv.config();
app.use(express.json());

app.use("/api", router);

let port = process.env.PORT;
app.listen(port, ()=>{
    console.log("port is runnnig on 5000");
})