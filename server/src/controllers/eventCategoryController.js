const db = require('../config/connection');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const cloudinary = require("../utils/cloudinary");
const ErrorHandler = require('../utils/errorhandler');

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

// Create a new category
exports.addCategory = catchAsyncErrors(async (req, res, next) => {
    const { name, About, todays_top } = req.body;
    const categoryFile = req.file

    try {
        const logo_url = await uploadAndCreateDocument(categoryFile)

        const sql = 'INSERT INTO category (name, logo_url, About,todays_top) VALUES (?, ?, ?, ?)';
        const result = await db.query(sql, [name, logo_url, About, todays_top]);

        const categoryId = result[0].insertId;

        const category = 'SELECT * FROM category WHERE id = ?';
        const [resObj] = await db.query(category, [categoryId]);

        const newCategory = resObj[0];

        res.status(201).json({ message: 'Category added successfully', category: newCategory });
    } catch (err) {
        console.error(err);
        return next(new ErrorHandler('Unable to proceed', 400));
    }
});

// Get all categories
exports.getCategories = catchAsyncErrors(async (req, res, next) => {
    try {
        const sql = 'SELECT * FROM category';
        const [categories] = await db.query(sql);

        res.status(200).json({ categories });
    } catch (err) {
        console.error(err);
        return next(new ErrorHandler('Unable to fetch categories', 500));
    }
});

// Get a specific category by ID
exports.getCategoryById = catchAsyncErrors(async (req, res, next) => {
    const { categoryId } = req.params;

    try {
        const sql = 'SELECT * FROM category WHERE id = ?';
        const [resObj] = await db.query(sql, [categoryId]);

        const category = resObj[0];

        if (!category) {
            return next(new ErrorHandler('Category not found', 404));
        }

        res.status(200).json({ category });
    } catch (err) {
        console.error(err);
        return next(new ErrorHandler('Unable to fetch category', 500));
    }
});

// Update category
exports.updateCategory = catchAsyncErrors(async (req, res, next) => {
    const { categoryId } = req.params;
    const categoryFile = req.file;

    try {
        // Check if the category exists
        const [categoryResult] = await db.query('SELECT * FROM category WHERE id = ?', [categoryId]);

        if (categoryResult.length === 0) {
            return next(new ErrorHandler(`Category with ID ${categoryId} not found`, 404));
        }

        let updateSql = 'UPDATE category SET ';
        const updateParams = [];
        const validFields = ['name', 'About', 'todays_top'];

        // If there's a new categoryFile, update logo_url
        if (categoryFile) {
            const logo_url = await uploadAndCreateDocument(categoryFile);
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
        updateParams.push(categoryId);

        // Execute the update query
        await db.query(updateSql, updateParams);

        // Fetch the updated category data
        const fetchCategorySql = 'SELECT * FROM category WHERE id = ?';
        const [updatedCategory] = await db.query(fetchCategorySql, [categoryId]);

        res.status(200).json({ message: `Category with ID ${categoryId} updated successfully`, category: updatedCategory[0] });
    } catch (err) {
        console.error(err);
        return next(new ErrorHandler("Unable to update category", 500));
    }
});

// Delete a category by ID
exports.deleteCategory = catchAsyncErrors(async (req, res, next) => {
    const { categoryId } = req.params;

    try {
        // Check if the category with the given ID exists
        const [categoryResult] = await db.query('SELECT * FROM category WHERE id = ?', [categoryId]);

        if (categoryResult.length === 0) {
            return res.status(404).json({ message: 'Category not found' });
        }

        const deleteSql = 'DELETE FROM category WHERE id = ?';
        await db.query(deleteSql, [categoryId]);

        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (err) {
        console.error(err);
        return next(new ErrorHandler('Unable to delete category', 500));
    }
});


// Add a new event
exports.addEvent = catchAsyncErrors(async (req, res, next) => {
    const { event_name, about, best_offer, avg_disc } = req.body;
    const eventLogoFile = req.files.eventLogoFile[0];
    const eventBannerFile = req.files.eventBannerFile[0];

    try {
        const eventLogoUrl = await uploadAndCreateDocument(eventLogoFile);
        const eventBannerUrl = await uploadAndCreateDocument(eventBannerFile);

        const sql = `
            INSERT INTO allEvents (event_name, event_logo_url, event_banner_url, about, best_offer, avg_disc)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const result = await db.query(sql, [event_name, eventLogoUrl, eventBannerUrl, about, best_offer, avg_disc]);

        const eventId = result[0].insertId;

        const event = 'SELECT * FROM allEvents WHERE id = ?';
        const [resObj] = await db.query(event, [eventId]);

        const newEvent = resObj[0];

        res.status(201).json({ message: 'Event added successfully', event: newEvent });
    } catch (err) {
        console.error(err);
        return next(new ErrorHandler('Unable to proceed', 400));
    }
});

// Update an existing event
exports.updateEvent = catchAsyncErrors(async (req, res, next) => {
    const { eventId } = req.params;
    const eventLogoFile = req.files.eventLogoFile ? req.files.eventLogoFile[0] : null;
    const eventBannerFile = req.files.eventBannerFile ? req.files.eventBannerFile[0] : null;

    try {
        // Check if the event exists
        const [eventResult] = await db.query('SELECT * FROM allEvents WHERE id = ?', [eventId]);

        if (eventResult.length === 0) {
            return res.status(404).json({ message: 'Event not found' });
        }

        let updateSql = 'UPDATE allEvents SET ';
        const updateParams = [];
        
        // If there's a new eventLogoFile, update event_logo_url
        if (eventLogoFile) {
            const eventLogoUrl = await uploadAndCreateDocument(eventLogoFile);
            updateSql += 'event_logo_url = ?, ';
            updateParams.push(eventLogoUrl);
        }

        // If there's a new eventBannerFile, update event_banner_url
        if (eventBannerFile) {
            const eventBannerUrl = await uploadAndCreateDocument(eventBannerFile);
            updateSql += 'event_banner_url = ?, ';
            updateParams.push(eventBannerUrl);
        }

        // Update other fields provided in the request body
        for (const field of ['event_name', 'about', 'best_offer', 'avg_disc']) {
            if (req.body[field] !== undefined) {
                updateSql += `${field} = ?, `;
                updateParams.push(req.body[field]);
            }
        }

        // Remove the trailing comma and add the WHERE clause
        updateSql = updateSql.slice(0, -2) + ` WHERE id = ?`;
        updateParams.push(eventId);

        // Execute the update query
        await db.query(updateSql, updateParams);

        // Fetch the updated event data
        const fetchEventSql = 'SELECT * FROM allEvents WHERE id = ?';
        const [updatedEvent] = await db.query(fetchEventSql, [eventId]);

        res.status(200).json({ message: `Event with ID ${eventId} updated successfully`, event: updatedEvent[0] });
    } catch (err) {
        console.error(err);
        return next(new ErrorHandler('Unable to update event', 500));
    }
});

exports.getAllEvents = catchAsyncErrors(async (req, res, next) => {
    try {
        const getAllEventsSql = 'SELECT * FROM allEvents';
        const [events, fields] = await db.query(getAllEventsSql);

        res.status(200).json({ data: events });
    } catch (err) {
        console.error('Error getting all events:', err);
        return next(new ErrorHandler('Internal server error', 400));
    }
});

exports.getEvent = catchAsyncErrors(async (req, res, next) => {
    const { eventId } = req.params;

    try {
        const getEventSql = 'SELECT * FROM allEvents WHERE id = ?';
        const [event, fields] = await db.query(getEventSql, [eventId]);

        if (event.length === 0) {
            return next(new ErrorHandler(`Event with ID ${eventId} not found`, 404));
        }

        res.status(200).json({ data: event[0] });
    } catch (err) {
        console.error('Error getting event:', err);
        return next(new ErrorHandler('Internal server error', 400));
    }
});

// Delete an event by ID
exports.deleteEvent = catchAsyncErrors(async (req, res, next) => {
    const { eventId } = req.params;

    try {
        // Check if the event with the given ID exists
        const [eventResult] = await db.query('SELECT * FROM allEvents WHERE id = ?', [eventId]);

        if (eventResult.length === 0) {
            return res.status(404).json({ message: 'Event not found' });
        }

        const deleteEventSql = 'DELETE FROM allEvents WHERE id = ?';
        await db.query(deleteEventSql, [eventId]);

        res.status(200).json({ message: `Event with ID ${eventId} deleted successfully` });
    } catch (err) {
        console.error('Error deleting event:', err);
        return next(new ErrorHandler('Internal server error', 500));
    }
});
