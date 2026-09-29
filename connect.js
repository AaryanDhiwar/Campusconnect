const mysql = require("mysql2");

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

db.connect((err) => {
    if (err) {
        console.error("MySQL connection failed:");
        console.error("Error code:", err.code);
console.error("Error message:", err.message);
        return;
    }

    console.log("MySQL Database Connected Successfully!");
});

module.exports = db;