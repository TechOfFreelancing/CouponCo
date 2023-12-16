const express = require('express');
const { addfestival_Discount, addStoreToFestival, deleteStoreFromFestival, updateFestivalDetails, getfestStoreDisplay, deleteOffer } = require('../controllers/festivalController');
const router = express.Router();
const { isAdmin } = require('../middleware/auth');


router.route("/admin/addFest&Disc").post(isAdmin,addfestival_Discount);
router.route("/admin/addStoreToFest/:storeId").post(isAdmin,addStoreToFestival);
router.route("/updateDetails/").put(isAdmin,updateFestivalDetails);
router.route("/deleteOffer").delete(isAdmin,deleteOffer);
router.route("/festStoreDisplay").get(getfestStoreDisplay);
router.route("/admin/deleteStoreFromFest/:storeId").delete(isAdmin,deleteStoreFromFestival);

module.exports = router;