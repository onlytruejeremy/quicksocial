const mysql = require("mysql");

const con = mysql.createPool({
  connectionLimit: 10,
  host: process.env.SQL_SERVER_URL,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: process.env.SQL_DATABASE,
  debug: false,
});

module.exports = con;
