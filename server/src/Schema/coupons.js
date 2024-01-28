const db = require('../config/connection');

class Coupons {
    static async createStoreTable() {
        const sql = `CREATE TABLE IF NOT EXISTS store (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            title VARCHAR(255),
            logo_url VARCHAR(255),
            type VARCHAR(255),
            description TEXT,
            moreAbout TEXT,
            hint TEXT,
            faq JSON, 
            total_ratings BIGINT DEFAULT 0,
            ratings_count INT DEFAULT 0,
            best_offer INT DEFAULT 0,
            avg_disc INT DEFAULT 0,
            coupons INT DEFAULT 0,
            offers INT DEFAULT 0 
        )`;

        try {
            const [result, fields] = await db.query(sql);
            console.log("Store Table Created Successfully!");
        } catch (err) {
            console.error("Error creating store table:", err);
        }
    }

    static async createSavedCouponsTable() {
        const sql = `
            CREATE TABLE IF NOT EXISTS saved_coupons (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT,
                coupon_id INT,
                FOREIGN KEY (user_id) REFERENCES users(user_id),
                FOREIGN KEY (coupon_id) REFERENCES coupons(coupon_id)
            )
        `;

        try {
            const [result, fields] = await db.query(sql);
            console.log("Saved Coupons Table Created Successfully!");
        } catch (err) {
            console.error("Error creating saved coupons table:", err);
        }
    }


    static async createSimilarTable() {
        const sql = `CREATE TABLE IF NOT EXISTS store_ids (
            id INT AUTO_INCREMENT PRIMARY KEY,
            event_id INT,
            category_id INT,
            store_id INT,
            store_type ENUM('similar', 'popular'),
            sId INT,
            FOREIGN KEY (category_id) REFERENCES category(id),
            FOREIGN KEY (store_id) REFERENCES store(id),
            FOREIGN KEY (event_id) REFERENCES allEvents(id)
        )`;

        try {
            const [result, fields] = await db.query(sql);
            console.log("Similar Store Table Created Successfully!");
        } catch (err) {
            console.error("Error creating Similar store table:", err);
        }
    }

    static async createShowStoreTable() {
        const sql = `CREATE TABLE IF NOT EXISTS store_display (
            id INT AUTO_INCREMENT PRIMARY KEY,
            store_id INT,
            coupon_id INT,
            show_in_carousel BOOLEAN DEFAULT FALSE,
            show_in_card BOOLEAN DEFAULT FALSE,
            show_in_fetured BOOLEAN DEFAULT FALSE,
            show_in_top BOOLEAN DEFAULT FALSE,
            coupons_count INT,
            thumbnail VARCHAR(255),
            content VARCHAR(255),
            ref_link VARCHAR(1000),
            FOREIGN KEY (store_id) REFERENCES store(id) ON DELETE CASCADE
        );`

        try {
            const [reslut, fields] = await db.query(sql);
            console.log("store_display table created successfully!");
        } catch (err) {
            console.error("Error in Creating store_display table:", err);
        }
    }

    static async createCouponsTable() {
        const sql = `CREATE TABLE IF NOT EXISTS coupons (
            coupon_id INT AUTO_INCREMENT PRIMARY KEY,
            store_id INT,
            title VARCHAR(255) NOT NULL,
            coupon_code VARCHAR(50) NOT NULL,
            type VARCHAR(255),
            category VARCHAR(255),
            ref_link VARCHAR(1000),
            due_date DATETIME,
            user_count INT DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            description TEXT,
            isVerified BOOLEAN DEFAULT false,
            FOREIGN KEY (store_id) REFERENCES store(id) ON DELETE CASCADE
        )`;

        try {
            const [result, fields] = await db.query(sql);
            console.log("Coupons Table Created Successfully!");
        } catch (err) {
            console.error("Error creating coupons table:", err);
        }
    }

    static async createFestivalShowcaseTable() {
        const sql = `CREATE TABLE IF NOT EXISTS festivalshowcase (
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