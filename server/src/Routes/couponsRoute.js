const express = require('express');
const { addStore, addStoreFAQs, addStoreRating, addCoupons, redeem, deleteCoupon, updateStore } = require('../controllers/couponsConroller');
const router = express.Router();
const { fileUpload, formData } = require('../utils/multer');


router.route("/admin/addStore").post(fileUpload.single('storeFile'),addStore);
router.route("/admin/updateStore/:storeId").put(fileUpload.single('storeFile'),updateStore);
router.route("/admin/addFaq/:storeId").put(formData.none(),addStoreFAQs);
router.route("/admin/addCoupons/:storeId").post(addCoupons);
router.route("/admin/delete/:cId").delete(deleteCoupon);

router.route("/addRatings/:storeId").put(addStoreRating);
router.route("/redeem/:cId").put(redeem);

module.exports = router;