const express = require("express");
const dotenv = require("dotenv");
const db = require("./db");
const app = express();
dotenv.config();
app.use(express.json());


let port = process.env.PORT;
app.listen(port, ()=>{
    console.log("port is runnnig on 5000");
})