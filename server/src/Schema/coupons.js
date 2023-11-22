const db = require('../config/connection');

class Coupons {
    static async createStoreTable() {
        const sql = `CREATE TABLE IF NOT EXISTS store (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            logo_url VARCHAR(255),
            type VARCHAR(255),
            description TEXT,
            hint TEXT,
            faq JSON, 
            total_ratings INT DEFAULT 0,
            ratings_count INT DEFAULT 0,
            stock INT DEFAULT 0
        )`;

        try {
            const [result, fields] = await db.query(sql);
            console.log("Store Table Created Successfully!");
        } catch (err) {
            console.error("Error creating store table:", err);
        }
    }

    static async createShowStoreTable() {
        const sql = `CREATE TABLE IF NOT EXISTS store_display (
            id INT AUTO_INCREMENT PRIMARY KEY,
            store_id INT,
            show_in_carousel BOOLEAN DEFAULT FALSE,
            show_in_card BOOLEAN DEFAULT FALSE,
            show_in_cashback BOOLEAN DEFAULT FALSE,
            show_in_top BOOLEAN DEFAULT FALSE,
            cashback_percentage INT,
            thumbnail VARCHAR(255),
            FOREIGN KEY (store_id) REFERENCES store(id) ON DELETE CASCADE
        );`

        try {
            const [reslut, fields] = await db.query(sql);
            console.log("store_display table created successfully!");
        } catch (err) {
            console.error("Error in Creating store_display table:", err);
        }
    }

    static async createRatingsTable() {
        const sql = `CREATE TABLE IF NOT EXISTS user_ratings (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT,
            store_id INT,
            rating INT,
            FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
            FOREIGN KEY (store_id) REFERENCES store(id) ON DELETE CASCADE
        )`;

        try {
            const [result, fields] = await db.query(sql);
            console.log("Ratings table created Successfully!");
        } catch (err) {
            console.error("Error creating ratings table:", err);
        }
    }

    static async createCouponsTable() {
        const sql = `CREATE TABLE IF NOT EXISTS coupons (
            coupon_id INT AUTO_INCREMENT PRIMARY KEY,
            store_id INT,
            title VARCHAR(255) NOT NULL,
            coupon_code VARCHAR(50) NOT NULL,
            type VARCHAR(255),
            ref_link VARCHAR(255),
            due_date DATETIME,
            user_count INT DEFAULT 0,
            description TEXT,
            FOREIGN KEY (store_id) REFERENCES store(id) ON DELETE CASCADE
        )`;

        try {
            const [result, fields] = await db.query(sql);
            console.log("Coupons Table Created Successfully!");
        } catch (err) {
            console.error("Error creating coupons table:", err);
        }
    }

    static async createRedeemTable() {
        const sql = `CREATE TABLE IF NOT EXISTS redeemed_coupons (
            redemption_id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT,
            coupon_id INT,
            redeemed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
            FOREIGN KEY (coupon_id) REFERENCES coupons(coupon_id) ON DELETE CASCADE
        )`
        try {
            const [result, fields] = await db.query(sql);
            console.log("Redeem Table Created Successfully!");
        } catch (err) {
            console.error("Error creating redeem table:", err);
        }

    }

    static async createFestivalShowcaseTable() {
        const sql = `CREATE TABLE IF NOT EXISTS festivalShowcase (
            id INT AUTO_INCREMENT PRIMARY KEY,
            festival_name VARCHAR(255) NOT NULL,
            discount INT DEFAULT 0,
            storeId INT,
            FOREIGN KEY (storeId) REFERENCES store(id) ON DELETE CASCADE
        )`

        try {
            const [reslut, fields] = await db.query(sql);
            console.log("festival Showcase table created successfully!");
        } catch (err) {
            console.error("Error in Creating festival Showcase table:", err);
        }
    }
}

module.exports = Coupons;