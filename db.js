const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_ROOT,
    database: process.env.DATABASE,
    port: process.env.DATABSE_PORT,
    password: "Arvind@gkmit#123"
});

db.connect((error)=>{
    if(error){
        console.log(error)
    }
    else{
        console.log("connected successfully");
    }
});
module.exports = db;
