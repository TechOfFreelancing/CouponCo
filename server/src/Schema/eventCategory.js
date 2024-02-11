const db = require('../config/connection');

class EventCategory {

    static async createCategoryTable() {
        const sql = `CREATE TABLE IF NOT EXISTS category (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            logo_url VARCHAR(255),
            About TEXT,
            todays_top BOOLEAN DEFAULT FALSE
        )`

        try {
            const [result, fields] = await db.query(sql);
            console.log("Category Table Created Successfully!");
        } catch (err) {
            console.error("Error creating Category table:", err);
        }
    }

    static async createEventShowcaseTable() {
        const sql = `CREATE TABLE IF NOT EXISTS events (
            id INT AUTO_INCREMENT PRIMARY KEY,
            coupon_id INT,
            store_id INT,
            event_name VARCHAR(255) NOT NULL,
            FOREIGN KEY (coupon_id) REFERENCES coupons(coupon_id) ON DELETE CASCADE,
            FOREIGN KEY (store_id) REFERENCES store(id) ON DELETE CASCADE
        )`

        try {
            const [reslut, fields] = await db.query(sql);
            console.log("event table created successfully!");
        } catch (err) {
            console.error("Error in creating event table:", err);
        }
    }

    static async createEventTable() {
        const sql = `CREATE TABLE IF NOT EXISTS allEvents (
            id INT AUTO_INCREMENT PRIMARY KEY,
            event_name VARCHAR(255) NOT NULL,
            event_logo_url VARCHAR(255),
            event_banner_url VARCHAR(255),
            about TEXT,
            best_offer VARCHAR(255) DEFAULT '0',
            avg_disc VARCHAR(255) DEFAULT '0'
        )`

        try {
            const [reslut, fields] = await db.query(sql);
            console.log("all events table created successfully!");
        } catch (err) {
            console.error("Error in creating all events table:", err);
        }
    }
}

module.exports = EventCategory;