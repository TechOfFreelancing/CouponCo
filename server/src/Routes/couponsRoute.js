const express = require('express');
const { addStore, addStoreFAQs, addStoreRating, addCoupons, redeem, deleteCoupon, updateStore, updateCoupon, deleteStore, getCoupons, getSingleCoupon, getStore } = require('../controllers/couponsConroller');
const router = express.Router();
const { fileUpload, formData } = require('../utils/multer');


router.route("/admin/addStore").post(fileUpload.single('storeFile'),addStore);
router.route("/getStore/:storeId").get(getStore);
router.route("/admin/delete/:storeId").delete(deleteStore);
router.route("/coupons/:storeId").get(getCoupons);
router.route("/coupons/:storeId/:cId").get(getSingleCoupon);


router.route("/admin/updateStore/:storeId").put(fileUpload.single('storeFile'),updateStore);
router.route("/admin/addFaq/:storeId").put(formData.none(),addStoreFAQs);
router.route("/admin/addCoupons/:storeId").post(addCoupons);

router.route("/admin/:cId").put(updateCoupon).delete(deleteCoupon);

router.route("/addRatings/:storeId").put(addStoreRating);
router.route("/redeem/:cId").put(redeem);

module.exports = router;