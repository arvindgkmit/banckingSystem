const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_ROOT,
    database: process.env.DATABASE,
    port: process.env.DATABSE_PORT,
    password: "Arvind@gkmit#123",
    multipleStatements: true
});

module.exports = db;
