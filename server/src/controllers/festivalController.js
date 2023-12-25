const db = require('../config/connection');
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require('../utils/errorhandler');


//add festival & Discount
exports.addfestival_Discount = catchAsyncErrors(async (req, res, next) => {
    const { festival, discount } = req.body;

    try {
        const sql = `INSERT INTO festivalshowcase (festival_name, discount) VALUES (?, ?)`;

        const result = await db.query(sql, [festival, discount]);

        res.status(201).json({ message: "Festival & Discount added successfully", rowId: result[0].insertId });
    } catch (err) {
        console.log(err);
        return next(new ErrorHandler("Unable to proceed", 400));
    }
});

// Add store to an existing festival and offer
exports.addStoreToFestival = catchAsyncErrors(async (req, res, next) => {
    const { storeId } = req.params;

    try {
        // Check if the festival exists
        const festivalExistsQuery = `select * from festivalshowcase where storeId is null`;
        const existingFestival = await db.query(festivalExistsQuery);

        if (existingFestival.length < 2) {
            return next(new ErrorHandler("No Festival Present Add it first", 404));
        }

        const { festival_name, discount } = existingFestival[0][0];

        const associateStoreQuery = `INSERT INTO festivalshowcase ( festival_name,discount,storeId) VALUES (?, ?, ?)`;
        await db.query(associateStoreQuery, [festival_name, discount, storeId]);

        res.status(201).json({ message: "Store associated with festival and offer successfully" });
    } catch (err) {
        console.error(err);
        return next(new ErrorHandler("Unable to associate store with festival", 400));
    }
});

// Update festival name and discount offer for all rows
exports.updateFestivalDetails = catchAsyncErrors(async (req, res, next) => {
    const { festival, discount } = req.body;

    try {
        const updateDetailsQuery = `UPDATE festivalshowcase SET festival_name = ?, discount = ? WHERE id > 0`;

        await db.query(updateDetailsQuery, [festival, discount]);

        res.status(200).json({ message: "Festival details updated successfully" });
    } catch (err) {
        console.error(err);
        return next(new ErrorHandler("Unable to update festival details", 400));
    }
});

// Delete store association from a festival
exports.deleteStoreFromFestival = catchAsyncErrors(async (req, res, next) => {
    const { storeId } = req.params;

    try {
        const deleteStoreQuery = `DELETE FROM festivalshowcase WHERE storeId = ?`;

        const [result] = await db.query(deleteStoreQuery, [storeId]);

        if (result.affectedRows === 0) {
            return next(new ErrorHandler("Store association not found", 404));
        }

        res.status(200).json({ message: "Store association deleted successfully" });
    } catch (err) {
        console.error(err);
        return next(new ErrorHandler("Unable to delete store association from festival", 400));
    }
});

//get festival_showcase
exports.getfestStoreDisplay = catchAsyncErrors(async (req, res, next) => {

    try {
        const sql = `select * from festivalShowcase`;

        const result = await db.query(sql);

        res.status(200).json({ message: "Success!", data: result[0] })

    } catch (err) {
        console.log(err);
        return next(new ErrorHandler("Unalbe to show data!", 400));
    }

});

//Delete festival offer(clear all data)
exports.deleteOffer = catchAsyncErrors(async (req, res, next) => {
    try {
        const sql = `delete from festivalshowcase`;

        const result = await db.query(sql);

        res.status(200).json({ message: "Success!" })
    } catch (err) {
        console.log(err);
        return next(new ErrorHandler("Unalbe to delete data!", 400));
    }
})