const mysql = require('mysql2');

const pool = mysql.createPool({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
    waitForConnections: true,
    connectionLimit: 10, // The limit based on needs
    queueLimit: 0
});

// Create a promise wrapper for the pool
const promisePool = pool.promise();

// Ensure proper connection to the database
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error getting connection: ', err);
        return;
    }

    console.log('Connection acquired');

    // Releasing the connection
    connection.release();
});

module.exports = promisePool;