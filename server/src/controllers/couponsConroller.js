const db = require('../config/connection');
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const cloudinary = require("../utils/cloudinary");
const ErrorHandler = require('../utils/errorhandler');
const jwt = require('jsonwebtoken');

//global method to convert file into uri
const uploadAndCreateDocument = async (file) => {
    try {
        const result = await cloudinary.uploader.upload(file.path, {
            resource_type: 'auto',
            folder: 'Store_logos',
        });

        return result.secure_url;
    } catch (error) {
        console.log(error);
        throw new ErrorHandler("Unable to upload to Cloudinary", 400);
    }
};

//add new store with basic details
exports.addStore = catchAsyncErrors(async (req, res, next) => {
    const { name, title, moreAbout, type, description, hint } = req.body;
    const storeFile = req.file;

    try {
        const logo_url = await uploadAndCreateDocument(storeFile);
        const sql = `INSERT INTO store (name,title,moreAbout, logo_url, type, description ,hint) VALUES (?, ?, ?, ?, ?, ?, ?)`;

        const result = await db.query(sql, [name, title, moreAbout, logo_url, type, description, hint]);
        const storeId = result[0].insertId;

        const store = `SELECT * FROM store WHERE id = ?`;
        const [resObj] = await db.query(store, [storeId]);

        const newStore = resObj[0];

        res.status(201).json({ message: "Store added successfully", store: newStore });
    } catch (err) {
        console.log(err);
        return next(new ErrorHandler("Unable to proceed", 400));
    }
});

exports.addToTodaysTop = catchAsyncErrors(async (req, res, next) => {
    const { storeId } = req.params;
    const { couponId } = req.body;
    const thumbFile = req.file;

    try {
        // Check if the store exists
        const [storeResult] = await db.query('SELECT * FROM store WHERE id = ?', [storeId]);
        if (storeResult.length === 0) {
            return next(new ErrorHandler(`Store with ID ${storeId} not found`, 400));
        }

        // Check if the coupon exists
        const [couponResult] = await db.query('SELECT * FROM coupons WHERE coupon_id = ?', [couponId]);
        if (couponResult.length === 0) {
            return next(new ErrorHandler(`Coupon with ID ${couponId} not found`, 400));
        }

        // Check if the coupon is already displayed
        const [isExist] = await db.query('SELECT * FROM store_display WHERE coupon_id = ?', [couponId]);
        if (isExist.length > 0) {
            return next(new ErrorHandler(`Coupon with ID ${couponId} is already displayed`, 400));
        }

        // Process thumbnail upload (if needed)
        const thumbnailUrl = await uploadAndCreateDocument(thumbFile);

        // Check the category and expiration date of the coupon
        const [couponInfoResult] = await db.query('SELECT category, due_date FROM coupons WHERE coupon_id = ?', [couponId]);
        const { category, due_date: dueDate } = couponInfoResult[0];
        // console.log(category);

        // Check if the coupon is expired
        if (new Date(dueDate) < new Date()) {
            return next(new ErrorHandler(`Coupon with ID ${couponId} is expired and cannot be added to today's top offer`, 400));
        }

        // Check the limit based on the coupon category
        let maxLimit = (category === 'Clothing') ? 8 : 4;

        // Count valid coupons
        const [validCouponsCountResult] = await db.query(`
        SELECT COUNT(*) AS count FROM store_display AS s INNER JOIN coupons AS c ON s.coupon_id = c.coupon_id WHERE c.category = ? AND c.due_date >= CURRENT_TIMESTAMP;
    `, [category]);

        const validCurrentCount = validCouponsCountResult[0].count;

        // Check the limit
        if (validCurrentCount >= maxLimit) {
            return next(new ErrorHandler(`Cannot add more than ${maxLimit} valid coupons to today's top offer`, 400));
        }

        // Insert the coupon into today's top
        const sql = 'INSERT INTO store_display (store_id, coupon_id, show_in_top, thumbnail) VALUES (?, ?, ?, ?)';
        const result = await db.query(sql, [storeId, couponId, true, thumbnailUrl]);

        res.status(200).json({ message: 'Success!', rowId: result[0].insertId });

    } catch (err) {
        console.error(err);
        return next(new ErrorHandler("Unable to add this to today's top offer", 500));
    }
});




//add to carousel
exports.addToCarousel = catchAsyncErrors(async (req, res, next) => {
    const { storeId } = req.params;
    const thumbFile = req.file;
    const { ref_link } = req.body;

    try {
        // Check if the store exists
        const [storeResult] = await db.query('SELECT * FROM store WHERE id = ?', [storeId]);

        if (storeResult.length === 0) {
            return next(new ErrorHandler(`Store with ID ${storeId} not found`, 404));
        }

        const thumbnailUrl = await uploadAndCreateDocument(thumbFile);

        const sql = `INSERT INTO store_display (store_id, show_in_carousel, thumbnail,ref_link) VALUES (?, ?, ?,?)`;

        const result = await db.query(sql, [storeId, true, thumbnailUrl, ref_link]);

        res.status(200).json({ message: "Success!", rowId: result[0].insertId });

    } catch (err) {
        console.error(err);
        return next(new ErrorHandler("Unable to add this to the carousel", 400));
    }
});

//add to Featured
exports.addToFeatured = catchAsyncErrors(async (req, res, next) => {
    const { storeId } = req.params;
    const { coupons_count } = req.body;

    try {
        // Check if the store exists
        const [storeResult] = await db.query('SELECT * FROM store WHERE id = ?', [storeId]);

        if (storeResult.length === 0) {
            return next(new ErrorHandler(`Store with ID ${storeId} not found`, 404));
        }

        const sql = `INSERT INTO store_display (store_id, show_in_fetured, coupons_count) VALUES (?, ?, ?)`;

        const result = await db.query(sql, [storeId, true, coupons_count]);

        res.status(200).json({ message: "Success!", rowId: result[0].insertId });

    } catch (err) {
        console.error(err);
        return next(new ErrorHandler("Unable to add this to the carousel", 400));
    }
});

//add store to card
exports.addToCard = catchAsyncErrors(async (req, res, next) => {
    const { storeId } = req.params;
    const thumbFile = req.file;
    const { data } = req.body;

    try {
        // Check if the store exists
        const [storeResult] = await db.query('SELECT * FROM store WHERE id = ?', [storeId]);

        if (storeResult.length === 0) {
            return next(new ErrorHandler(`Store with ID ${storeId} not found`, 404));
        }

        const thumbnailUrl = await uploadAndCreateDocument(thumbFile);

        const sql = `INSERT INTO store_display (store_id, show_in_card, thumbnail,content) VALUES (?, ?, ?, ?)`;

        const result = await db.query(sql, [storeId, true, thumbnailUrl, data]);

        res.status(200).json({ message: "Success!", rowId: result[0].insertId });

    } catch (err) {
        console.error(err);
        return next(new ErrorHandler("Unable to add this at card", 400));
    }
});

//get store_display
exports.getStoreDisplay = catchAsyncErrors(async (req, res, next) => {

    try {
        const sql = `select * from store_display`;

        const result = await db.query(sql);

        res.status(200).json({ message: "Success!", data: result[0] })

    } catch (err) {
        console.log(err);
        return next(new ErrorHandler("Unalbe to show store display data!", 400));
    }

});

//delete store from store_display
exports.deleteFromDisplay = catchAsyncErrors(async (req, res, next) => {
    const { storeId } = req.params;
    const { show_in } = req.body;

    try {
        const sql = `DELETE FROM store_display WHERE store_id = ? AND ${show_in} = 1`;

        const result = await db.query(sql, [storeId]);

        res.status(200).json({ message: "Success in deletion" })

    } catch (err) {
        console.log(err);
        return next(new ErrorHandler("Unalbe to delete!", 400));
    }

});

// Get all stores with search and filter options
exports.getAllStores = catchAsyncErrors(async (req, res, next) => {
    const { keyword, type } = req.query;
    // const limit = 12;
    // const offset = (page - 1) * limit;

    let sql = 'SELECT * FROM store';

    const conditions = [];
    const params = [];

    if (keyword) {
        conditions.push('name LIKE ?');
        params.push(`%${keyword}%`);
    }

    if (type) {
        conditions.push('type LIKE ?');
        params.push(`%${type}%`);
    }

    if (conditions.length > 0) {
        sql += ' WHERE ' + conditions.join(' AND ');
    }

    // // Add pagination
    // sql += ` LIMIT ? OFFSET ?`;
    // params.push(limit);
    // params.push(offset);

    try {
        const [result, fields] = await db.query(sql, [...params]);

        res.status(200).json({
            success: true,
            stores: result,
        });
    } catch (err) {
        console.error('Error fetching stores:', err);
        return next(new ErrorHandler("Stores not found", 400));
    }
});

// Get store 
exports.getSingleStore = catchAsyncErrors(async (req, res, next) => {
    const { storeId } = req.params;

    try {
        // Fetch the store details by ID
        const [storeResult] = await db.query('SELECT * FROM store WHERE id = ?', [storeId]);

        if (storeResult.length === 0) {
            return next(new ErrorHandler(`Store with ID ${storeId} not found`, 404));
        }

        const store = storeResult[0];

        res.status(200).json({ message: `Store with ID ${storeId} fetched successfully`, store });
    } catch (err) {
        console.error(err);
        return next(new ErrorHandler("Unable to fetch store", 500));
    }
});

// Update store 
exports.updateStore = catchAsyncErrors(async (req, res, next) => {
    const { storeId } = req.params;
    const storeFile = req.file;

    try {
        // Check if the store exists
        const [storeResult] = await db.query('SELECT * FROM store WHERE id = ?', [storeId]);

        if (storeResult.length === 0) {
            return next(new ErrorHandler(`Store with ID ${storeId} not found`, 404));
        }

        let updateSql = 'UPDATE store SET ';
        const updateParams = [];
        const validFields = ['name', 'title', 'type', 'description', 'moreAbout', 'hint'];

        // If there's a new storeFile, update logo_url
        if (storeFile) {
            const logo_url = await uploadAndCreateDocument(storeFile);
            updateSql += 'logo_url = ?, ';
            updateParams.push(logo_url);
        }

        // Update other fields provided in the request body
        for (const field of validFields) {
            if (req.body[field]) {
                updateSql += `${field} = ?, `;
                updateParams.push(req.body[field]);
            }
        }

        // Remove the trailing comma and add the WHERE clause
        updateSql = updateSql.slice(0, -2) + ` WHERE id = ?`;
        updateParams.push(storeId);

        // Execute the update query
        await db.query(updateSql, updateParams);

        // Fetch the updated store data
        const fetchStoreSql = 'SELECT * FROM store WHERE id = ?';
        const [updatedStore] = await db.query(fetchStoreSql, [storeId]);

        res.status(200).json({ message: `Store with ID ${storeId} updated successfully`, store: updatedStore[0] });
    } catch (err) {
        console.error(err);
        return next(new ErrorHandler("Unable to update store", 500));
    }
});

// Delete a store
exports.deleteStore = catchAsyncErrors(async (req, res, next) => {
    const { storeId } = req.params;

    try {
        // Check if the store exists
        const [storeResult] = await db.query('SELECT * FROM store WHERE id = ?', [storeId]);

        if (storeResult.length === 0) {
            return next(new ErrorHandler(`Store with ID ${storeId} not found`, 404));
        }

        // Delete the store
        await db.query('DELETE FROM store WHERE id = ?', [storeId]);

        res.status(200).json({ message: `Store with ID ${storeId} deleted successfully` });
    } catch (err) {
        console.error(err);
        return next(new ErrorHandler("Unable to delete store", 500));
    }
});

// Add FAQs for a specific store
exports.addStoreFAQs = catchAsyncErrors(async (req, res, next) => {
    const { storeId } = req.params;
    const faq = req.body;

    try {
        // Convert the FAQs from form-data format to JSON
        const faqArray = Object.entries(faq).map(([question, answer]) => ({ answer, question }));

        const sql = `UPDATE store SET faq = ? WHERE id = ?`;
        await db.query(sql, [JSON.stringify(faqArray), storeId]);

        const updatedStore = `SELECT * FROM store WHERE id = ?`;
        const [resObj] = await db.query(updatedStore, [storeId]);

        const updatedStoreData = resObj[0];

        res.status(200).json({ message: "Store FAQs updated successfully", store: updatedStoreData });
    } catch (err) {
        console.log(err);
        return next(new ErrorHandler("Unable to proceed", 400));
    }
});

//add ratings
exports.addStoreRating = catchAsyncErrors(async (req, res, next) => {
    const { storeId } = req.params;
    const { rating } = req.body;
    try {

        const updateStoreRatingSql = `
            UPDATE store 
            SET total_ratings = total_ratings + ?, ratings_count = ratings_count + 1
            WHERE id = ?
        `;
        await db.query(updateStoreRatingSql, [rating, storeId]);

        // Fetch the updated store data
        const fetchStoreSql = `SELECT * FROM store WHERE id = ?`;
        const [updatedStore] = await db.query(fetchStoreSql, [storeId]);

        res.status(200).json({ message: "Rating added successfully", store: updatedStore });
    } catch (err) {
        console.error(err);
        return next(new ErrorHandler("Unable to add rating", 400));
    }
});

//add coupons
exports.addCoupons = catchAsyncErrors(async (req, res, next) => {
    const { storeId } = req.params;
    // console.log(storeId);
    const { title, couponCode, type, ref_link, category, dueDate, description, isVerified } = req.body;
    // console.log(req.body);
    try {
        // Check if the store exists
        const [storeResult] = await db.query('SELECT * FROM store WHERE id = ?', [storeId]);

        if (storeResult.length === 0) {
            return next(new ErrorHandler(`Store with ID ${storeId} not found`, 404));
        }

        if (!title || !couponCode || !dueDate || !type) {
            return res.status(400).json({ error: 'Incomplete data' });
        }


        // Inserting the coupon into the coupons table
        const insertCouponSql = `
        INSERT INTO coupons (store_id, title, coupon_code, type, ref_link,category, due_date, isVerified, description,created_at)
        VALUES (?, ?, ?, ?, ?, ?,?,? , ?,NOW())
        `;
        const [result, fields] = await db.query(insertCouponSql, [storeId, title, couponCode, type, ref_link, category, dueDate, isVerified, description]);

        if (req.body.events) {
            await Promise.all(
                req.body.events.map(async (e) => {
                    const [existingEvent] = await db.query('SELECT * FROM events WHERE coupon_id = ? AND store_id = ? AND event_name = ?', [result.insertId, storeId, e]);

                    if (existingEvent.length === 0) {
                        await db.query('INSERT INTO events (coupon_id,store_id,event_name) VALUES (?,?,?)', [result.insertId, storeId, e]);
                    }
                })
            );
        }

        // Updating the stock count in the store table
        const updateCouponsOffersSql = `
         UPDATE store 
         SET 
         coupons = coupons + 1,
          offers = CASE 
           WHEN LOWER(?) = 'deal' THEN offers + 1
           WHEN LOWER(?) = 'offer' THEN offers + 1
           ELSE offers
           END
           WHERE id = ?
        `;
        await db.query(updateCouponsOffersSql, [type, type, storeId]);

        res.status(201).json({ message: 'Coupon added successfully' });
    } catch (err) {
        console.error('Error adding coupon:', err);
        return next(new ErrorHandler('Internal server error', 400));
    }
});

//decrease Coupons count of store
exports.decreaseCouponsOffers = catchAsyncErrors(async (req, res, next) => {
    const { couponsCount, offersCount } = req.body;
    const { storeId } = req.params;

    try {
        if (typeof couponsCount == null || typeof offersCount == null) {
            return res.status(400).json({ error: 'Invalid input' });
        }

        const decreaseCouponsSql = `
            UPDATE store 
            SET coupons = GREATEST(coupons - ?, 0),
            offers = GREATEST(offers - ?, 0)
            WHERE id = ?
        `;
        await db.query(decreaseCouponsSql, [couponsCount, offersCount, storeId]);

        res.status(200).json({ message: 'Coupons and Offers counts updated successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Update a coupon
exports.updateCoupon = catchAsyncErrors(async (req, res, next) => {
    const { cId } = req.params;
    try {
        // Check if the coupon exists
        const [couponResult] = await db.query('SELECT * FROM coupons WHERE coupon_id = ?', [cId]);

        // console.log(couponResult);

        if (couponResult.length === 0) {
            return next(new ErrorHandler(`Coupon with ID ${cId} not found`, 404));
        }

        if (req.body.events) {
            // Get the current list of events associated with the coupon from the database
            const [currentEvents] = await db.query('SELECT * FROM events WHERE coupon_id = ?', [cId]);

            // Identify events to be removed
            const eventsToRemove = currentEvents.map((event) => event.event_name).filter((event) => !req.body.events.includes(event));

            // Identify events to be added
            const eventsToAdd = req.body.events.filter((event) => !currentEvents.map((e) => e.event_name).includes(event));

            // Remove events
            await Promise.all(
                eventsToRemove.map(async (event) => {
                    await db.query('DELETE FROM events WHERE coupon_id = ? AND event_name = ?', [cId, event]);
                })
            );

            // Add new events
            await Promise.all(
                eventsToAdd.map(async (event) => {
                    // Check if the coupon is already associated with the event
                    const [existingEvent] = await db.query('SELECT * FROM events WHERE coupon_id = ? AND store_id = ? AND event_name = ?', [cId, couponResult[0].store_id, event]);

                    if (existingEvent.length === 0) {
                        // Insert the event only if it does not exist
                        await db.query('INSERT INTO events (coupon_id, store_id, event_name) VALUES (?, ?, ?)', [cId, couponResult[0].store_id, event]);
                    }
                })
            );
        }

        let updateSql = 'UPDATE coupons SET ';
        const updateParams = [];
        let updateDate = false;
        const validFields = ['title', 'coupon_code', 'type', 'ref_link', 'category', 'due_date', 'description', 'created_at', 'isVerified'];

        // Update fields provided in the request body
        for (const field of validFields) {
            if (req.body[field] !== undefined) {
                updateSql += `${field} = ?, `;
                updateParams.push(req.body[field]);
                updateDate = true;
            }
        }

        if (updateDate) {
            updateSql += `created_at = NOW(), `;
        }

        // Remove the trailing comma and add the WHERE clause
        updateSql = updateSql.slice(0, -2) + ` WHERE coupon_id = ?`;
        updateParams.push(cId);


        // Execute the update query
        await db.query(updateSql, updateParams);

        res.status(200).json({ message: `Coupon with ID ${cId} updated successfully` });
    } catch (err) {
        console.error(err);
        return next(new ErrorHandler("Unable to update coupon", 500));
    }
});

exports.getEventsForCoupons = catchAsyncErrors(async (req, res, next) => {
    const { cId } = req.params;
    // console.log(cId);
    try {
        // Fetch the single coupon for the store based on cId
        const [couponResult] = await db.query('SELECT * FROM events WHERE coupon_id = ?', [cId]);

        if (couponResult.length === 0) {
            return res.status(200).json({ coupons: [] });
        }

        return res.status(200).json({ message: `Coupon with ID ${cId} fetched successfully`, coupons: couponResult });
    } catch (err) {
        console.error(err);
        return next(new ErrorHandler("Unable to fetch coupon", 500));
    }
})

exports.getDataForEvent = catchAsyncErrors(async (req, res, next) => {
    const { event } = req.params;
    // console.log(cId);
    try {
        // Fetch the single coupon for the store based on cId
        const [couponResult] = await db.query('SELECT * FROM events WHERE event_name = ?', [event]);

        if (couponResult.length === 0) {
            return res.status(200).json({ coupons: [] });
        }

        return res.status(200).json({ message: `Event coupons fetched successfully`, coupons: couponResult });
    } catch (err) {
        console.error(err);
        return next(new ErrorHandler("Unable to fetch coupon", 500));
    }
})

// Get single coupon for a specific store
exports.getSingleCoupon = catchAsyncErrors(async (req, res, next) => {
    const { storeId, cId } = req.params;

    try {
        // Check if the store exists
        const [storeResult] = await db.query('SELECT * FROM store WHERE id = ?', [storeId]);

        if (storeResult.length === 0) {
            return next(new ErrorHandler(`Store with ID ${storeId} not found`, 404));
        }

        // Fetch the single coupon for the store based on cId
        const [couponResult] = await db.query('SELECT coupons.*, store.name, store.logo_url, store.description,store.moreAbout, store.hint, store.faq, store.total_ratings, store.ratings_count, store.coupons FROM coupons INNER JOIN store ON coupons.store_id = store.id  WHERE coupons.store_id = ? AND coupons.coupon_id = ?', [storeId, cId]);

        if (couponResult.length === 0) {
            return next(new ErrorHandler(`Coupon with ID ${cId} not found for store with ID ${storeId}`, 404));
        }

        res.status(200).json({ message: `Coupon with ID ${cId} for store with ID ${storeId} fetched successfully`, coupon: couponResult[0] });
    } catch (err) {
        console.error(err);
        return next(new ErrorHandler("Unable to fetch coupon", 500));
    }
});

// Get all coupons for a specific store
exports.getCoupons = catchAsyncErrors(async (req, res, next) => {
    const { storeId } = req.params;

    try {
        // Check if the store exists
        const [storeResult] = await db.query('SELECT * FROM store WHERE id = ?', [storeId]);

        if (storeResult.length === 0) {
            return next(new ErrorHandler(`Store with ID ${storeId} not found`, 404));
        }

        // Fetch all coupons for the store
        const [couponsResult] = await db.query('SELECT * FROM coupons WHERE store_id = ?', [storeId]);

        res.status(200).json({ message: `Coupons for store with ID ${storeId} fetched successfully`, coupons: couponsResult });
    } catch (err) {
        console.error(err);
        return next(new ErrorHandler("Unable to fetch coupons", 500));
    }
});

exports.getUnverifiedCoupons = catchAsyncErrors(async (req, res, next) => {
    const sql = `SELECT * FROM Coupons WHERE isVerified = 0`;

    try {
        const [result, fields] = await db.query(sql);

        res.status(200).json({
            success: true,
            coupons: result,
        });
    } catch (err) {
        console.error('Error fetching unverified coupons:', err);
        return next(new ErrorHandler("Unverified coupons not found", 400));
    }
});

//Get Coupons based on search and type
exports.getCouponsBy = catchAsyncErrors(async (req, res, next) => {
    const { keyword, type, page = 1 } = req.query;
    const limit = 12;
    const offset = (page - 1) * limit;

    let sql = `SELECT * FROM Coupons`;

    // Checking for filter object
    if (type || keyword) {
        sql += ` WHERE`;

        if (keyword) {
            sql += ` title LIKE "%${keyword}%"`;
            if (type) {
                sql += ` AND`;
            }
        }
        if (type) {
            sql += ` type = '${type}'`;
        }
    }

    // Adding pagination
    sql += ` LIMIT ? OFFSET ?`;

    try {
        const [result, fields] = await db.query(sql, [limit, offset]);

        res.status(200).json({
            success: true,
            coupons: result,
        });
    } catch (err) {
        console.error('Error fetching coupons:', err);
        return next(new ErrorHandler("Coupons not found", 400));
    }
});

//increase coupons user count
exports.incrementUserCount = catchAsyncErrors(async (req, res, next) => {
    const { cId } = req.params;
    try {
        const incrementUserCountSql = `
            UPDATE coupons 
            SET user_count = user_count + 1
            WHERE coupon_id = ?
        `;
        await db.query(incrementUserCountSql, [cId]);

        res.status(200).json({ message: "User count incremented successfully" });
    } catch (err) {
        console.error(err);
        return next(new ErrorHandler("Unable to increment user count", 400));
    }
});

// Save Coupon for a User
exports.saveCouponForUser = catchAsyncErrors(async (req, res, next) => {
    const { userId } = req.body;
    const { cId } = req.params;
    try {
        const saveCouponSql = `
            INSERT INTO saved_coupons (user_id, coupon_id)
            VALUES (?, ?)
        `;
        await db.query(saveCouponSql, [userId, cId]);

        res.status(200).json({ message: "Coupon saved successfully" });
    } catch (err) {
        console.error(err);
        return next(new ErrorHandler("Unable to save coupon", 400));
    }
});

// Unsave Coupon for a User
exports.unsaveCouponForUser = catchAsyncErrors(async (req, res, next) => {
    const { cId } = req.params;
    try {
        const unsaveCouponSql = `
            DELETE FROM saved_coupons 
            WHERE coupon_id = ?
        `;
        await db.query(unsaveCouponSql, [cId]);

        res.status(200).json({ message: "Coupon unsaved successfully" });
    } catch (err) {
        console.error(err);
        return next(new ErrorHandler("Unable to unsave coupon", 400));
    }
});

// Delete a coupon
exports.deleteCoupon = catchAsyncErrors(async (req, res, next) => {
    const { cId } = req.params;

    try {
        // Check if the coupon exists
        const [couponResult] = await db.query('SELECT * FROM coupons WHERE coupon_id = ?', [cId]);

        if (couponResult.length === 0) {
            return next(new ErrorHandler(`Coupon with ID ${cId} not found`, 404));
        }

        // Delete the coupon
        await db.query('DELETE FROM coupons WHERE coupon_id = ?', [cId]);

        // Update the stock count in the store table (assuming there's a stock field)
        const storeId = couponResult[0].store_id;
        await db.query('UPDATE store SET coupons = coupons - 1 WHERE id = ?', [storeId]);

        // Decrease offers count only if the deleted coupon was of type 'deal' or 'offer'
        if (couponResult[0].type && (couponResult[0].type.toLowerCase() === 'deal' || couponResult[0].type.toLowerCase() === 'offer')) {
            await db.query('UPDATE store SET offers = GREATEST(offers - 1, 0) WHERE id = ?', [storeId]);
        }

        res.status(200).json({ message: `Coupon with ID ${cId} deleted successfully` });
    } catch (err) {
        console.error(err);
        return next(new ErrorHandler("Unable to delete coupon", 500));
    }
});

//add similar and popular store ids
exports.addStoreIds = catchAsyncErrors(async (req, res, next) => {
    const { storeId } = req.params;
    const { storeType, storeid } = req.body;
    try {
        const insertStoreIdsSql = `
            INSERT INTO store_ids (store_id, store_type, sId)
            VALUES (?, ?, ?)
        `;
        await db.query(insertStoreIdsSql, [storeId, storeType, storeid]);

        res.status(200).json({ message: "Store IDs added successfully" });
    } catch (err) {
        console.error(err);
        return next(new ErrorHandler("Unable to add store IDs", 400));
    }
});

// Remove a row based on sId provided in req.params
exports.removeStoreId = catchAsyncErrors(async (req, res, next) => {
    const { storeId } = req.params;
    try {
        const deleteStoreIdSql = `
            DELETE FROM store_ids
            WHERE sId = ?
        `;
        await db.query(deleteStoreIdSql, [storeId]);

        res.status(200).json({ message: "Store ID removed successfully" });
    } catch (err) {
        console.error(err);
        return next(new ErrorHandler("Unable to remove store ID", 400));
    }
});

// Get all data from store_ids table
exports.getAllStoreIds = catchAsyncErrors(async (req, res, next) => {
    try {
        const getAllStoreIdsSql = `
            SELECT * FROM store_ids
        `;
        const storeIds = await db.query(getAllStoreIdsSql);

        res.status(200).json({ data: storeIds[0] });
    } catch (err) {
        console.error(err);
        return next(new ErrorHandler("Unable to retrieve store IDs", 500));
    }
});

exports.getCategoryCoupons = catchAsyncErrors(async (req, res, next) => {
    const { category } = req.params;
    // console.log(category);
    try {
        const getCoupons = `
           SELECT * FROM store AS S INNER JOIN coupons AS C WHERE S.id = C.store_id && category = ?
        `;
        const coupons = await db.query(getCoupons, [category]);

        res.status(200).json({ data: coupons[0] });
    } catch (err) {
        console.error(err);
        return next(new ErrorHandler("Unable to retrieve coupons", 500));
    }
});


exports.getStoreDisplayAllData = catchAsyncErrors(async (req, res, next) => {
    const { category } = req.params;
    try {
        const getData = `
        SELECT * 
        FROM store_display AS s 
        INNER JOIN store AS st ON s.store_id = st.id 
        INNER JOIN coupons AS c ON s.coupon_id = c.coupon_id WHERE c.category = ?
        `;
        const data = await db.query(getData, [category]);

        res.status(200).json({ data: data[0] });
    } catch (err) {
        console.error(err);
        return next(new ErrorHandler("Unable to retrieve store display data", 500));
    }
});