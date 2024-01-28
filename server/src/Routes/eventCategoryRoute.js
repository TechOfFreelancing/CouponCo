const express = require('express');
const { addCategory, updateCategory, getCategories, getCategoryById, deleteCategory, addEvent, updateEvent, getAllEvents, getEvent, deleteEvent } = require('../controllers/eventCategoryController');
const router = express.Router();
const { fileUpload } = require('../utils/multer');
const { isAdmin } = require('../middleware/auth');


router.route("/admin/addCategory").post(isAdmin, fileUpload.single('categoryFile'), addCategory);
router.route("/getCategories").get(getCategories);
router.route("/getCategory/:categoryId").get(getCategoryById);
router.route("/admin/deleteCategory/:categoryId").delete(isAdmin, deleteCategory);
router.route("/admin/updateCategory/:categoryId").put(isAdmin, fileUpload.single('categoryFile'), updateCategory);

router.route('/admin/addEvent').post(isAdmin, fileUpload.fields([{ name: 'eventLogoFile', maxCount: 1 }, { name: 'eventBannerFile', maxCount: 1 }]), addEvent);
router.route("/getAllEvents").get(getAllEvents);
router.route("/getEvent/:eventId").get(getEvent);
router.route("/admin/deleteEvent/:eventId").delete(isAdmin, deleteEvent);
router.route('/admin/updateEvent/:eventId').put(isAdmin, fileUpload.fields([{ name: 'eventLogoFile', maxCount: 1 }, { name: 'eventBannerFile', maxCount: 1 }]), updateEvent);


module.exports = router;