const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    port: 3306,
    password: "MySQL@2024!",
    database: "greenmind"
});

module.exports = connection;