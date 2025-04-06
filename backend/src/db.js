const mysql = require('mysql2');
require('dotenv').config();

// Creating a conneciton to the database
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

// Connect to the MySQL database
db.connect(err => {
    if (err) {
        console.error('Error connecting to the database: ', err);
        process.exit(1);
    } else {
        console.log('Connected to the MySQL database >:3');
    }
});

module.exports = db; // Export the db connection object to be used elsehwere