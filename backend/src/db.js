/* const mysql = require('mysql2');
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

module.exports = db; // Export the db connection object to be used elsewhere */

const mysql = require('mysql2');
require('dotenv').config();

// Function to attempt connection to the database with retries
const attemptConnection = (retries = 5, delay = 5000) => {
    const db = mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
    });

    return new Promise((resolve, reject) => {
        db.connect(err => {
            console.log(err)
            if (err && retries > 0) {
                console.log(`MySQL connection failed, retrying in ${delay / 1000} seconds...`);
                setTimeout(() => {
                    resolve(attemptConnection(retries - 1, delay)); // Retry
                }, delay);
            } else if (err) {
                reject('Failed to connect to MySQL');
            } else {
                console.log('Connected to MySQL!');
                resolve(db); // Return db connection when successful
            }
        });
    });
};

/* // Start attempting connection to MySQL
attemptConnection().then(db => {
    // Export the db connection once it's successfully established
    module.exports = db;
}).catch(err => {
    console.error(err);
    process.exit(1); // Exit the process if MySQL connection fails after all retries
}); */

module.exports = attemptConnection();