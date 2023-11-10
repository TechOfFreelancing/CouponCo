const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
})

connection.connect((err) => {
   if(err) throw err;
   console.log("Connection Success!");
})
module.exports = connection