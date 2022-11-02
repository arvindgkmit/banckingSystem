const mysql = require("mysql");
const Sequelize = require("sequelize"); 
const dotenv = require("dotenv");
dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE, process.env.DATABASE_ROOT,
    "Arvind@gkmit#123", {
    host: process.env.DATABASE_HOST,
    dialect:  'mysql'
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;