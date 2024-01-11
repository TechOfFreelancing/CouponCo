const db = require('../config/connection');
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require('../utils/errorhandler');

exports.addToEvent = catchAsyncErrors(async (req, res, next) => {
    const { coupon_id } = req.params;
    const { store_id, events } = req.body;

    try {
        const [store] = await db.query('SELECT * FROM store WHERE id = ?', [store_id]);

        if (store.length === 0) {
            return next(new ErrorHandler("Store not found", 404));
        }

        const [coupon] = await db.query('SELECT * FROM coupons AS c INNER JOIN store AS s ON c.store_id = s.id WHERE c.coupon_id = ?', [coupon_id]);

        if (coupon.length === 0) {
            return next(new ErrorHandler("Coupon not found", 404));
        }

        await Promise.all(
            events.map(async (e) => {
                // Check if the coupon is already associated with the event
                const [existingEvent] = await db.query('SELECT * FROM events WHERE coupon_id = ? AND store_id = ? AND event_name = ?', [coupon_id, store_id, e]);

                if (existingEvent.length === 0) {
                    // Insert the event only if it does not exist
                    await db.query('INSERT INTO events (coupon_id,store_id,event_name) VALUES (?,?,?)', [coupon_id, store_id, e]);
                }
            })
        );

        return res.status(200).json("Coupon events added successfully");
    } catch (err) {
        console.error(err);
        return next(new ErrorHandler("Unable to add this to the event", 400));
    }
});

exports.updateCouponEvents = catchAsyncErrors(async (req, res, next) => {
    const { coupon_id } = req.params;
    const { store_id, events } = req.body;

    try {
        const [store] = await db.query('SELECT * FROM store WHERE id = ?', [store_id]);

        if (store.length === 0) {
            return next(new ErrorHandler("Store not found", 404));
        }

        const [coupon] = await db.query('SELECT * FROM coupons AS c INNER JOIN store AS s ON c.store_id = s.id WHERE c.coupon_id = ?', [coupon_id]);

        if (coupon.length === 0) {
            return next(new ErrorHandler("Coupon not found", 404));
        }

        // Get the current list of events associated with the coupon from the database
        const [currentEvents] = await db.query('SELECT * FROM events WHERE coupon_id = ?', [coupon_id]);

        // Identify events to be removed
        const eventsToRemove = currentEvents.map((event) => event.event_name).filter((event) => !events.includes(event));

        // Identify events to be added
        const eventsToAdd = events.filter((event) => !currentEvents.map((e) => e.event_name).includes(event));

        // Remove events
        await Promise.all(
            eventsToRemove.map(async (event) => {
                await db.query('DELETE FROM events WHERE coupon_id = ? AND event_name = ?', [coupon_id, event]);
            })
        );

        // Add new events
        await Promise.all(
            eventsToAdd.map(async (event) => {
                // Check if the coupon is already associated with the event
                const [existingEvent] = await db.query('SELECT * FROM events WHERE coupon_id = ? AND store_id = ? AND event_name = ?', [coupon_id, store_id, event]);

                if (existingEvent.length === 0) {
                    // Insert the event only if it does not exist
                    await db.query('INSERT INTO events (coupon_id, store_id, event_name) VALUES (?, ?, ?)', [coupon_id, store_id, event]);
                }
            })
        );

        return res.status(200).json("Coupon events updated successfully");
    } catch (err) {
        console.error(err);
        return next(new ErrorHandler("Unable to update coupon events", 400));
    }
});
