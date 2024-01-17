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

    static async createContactDetailsTable() {
        const sql = `CREATE TABLE IF NOT EXISTS contacts (
            contact_id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT,
            fullname VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            message VARCHAR(255) NOT NULL,
            isAccepted TINYINT,
            FOREIGN KEY (user_id) REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE CASCADE
        );`


        try {
            const [result, fields] = await db.query(sql);
            console.log("contact details table created successfully!");
        } catch (err) {
            console.error("Error in creating contact details table:", err);
        }
    }

    static async createAdvertiseTable() {
        const sql = `CREATE TABLE IF NOT EXISTS advertise (
            ads_id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT,
            fullname VARCHAR(255) NOT NULL,
            company VARCHAR(255) NOT NULL,
            website_url VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            affiliate VARCHAR(255) NOT NULL,
            affiliate_network VARCHAR(255),
            isAccepted TINYINT NOT NULL,
            message VARCHAR(255) NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE CASCADE
        );`


        try {
            const [result, fields] = await db.query(sql);
            console.log("advertise table created successfully!");
        } catch (err) {
            console.error("Error in creating advertise table:", err);
        }
    }

}

module.exports = User;