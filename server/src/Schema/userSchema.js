const db = require('../config/connection');
class User {
    
    static async createUserTable() {
        const sql = `CREATE TABLE IF NOT EXISTS users(user_id INT AUTO_INCREMENT PRIMARY KEY,username VARCHAR(255) NOT NULL,password VARCHAR(255) NOT NULL,email VARCHAR(255) NOT NULL, UNIQUE(email),role VARCHAR(255) DEFAULT 'general')`;

        try {
            const [result, fields] = await db.query(sql);
            console.log("User Table Created Successfully!");
        } catch (err) {
            console.error("Error creating user table:", err);
        }
    }
}

module.exports = User;