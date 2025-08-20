// config/connection.js
const mysql = require("mysql2");
const config = require("../config/config")

const pool = mysql.createPool({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error("❌ Error connecting to MySQL:", err.message, err.code);
  } else {
    console.log("✅ Connected to MySQL database!");
    connection.release();
  }
});

module.exports = pool.promise();
