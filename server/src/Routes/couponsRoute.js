const express = require('express');
const { addStore, addStoreFAQs, addStoreRating, addCoupons, redeem, deleteCoupon, updateStore, updateCoupon, deleteStore, getCoupons, getSingleCoupon, getSingleStore, getAllStores, getCouponsBy, addToCarousel, addToCard, getStoreDisplay, deleteFromDisplay, addToTodaysTop, getRedeemCount, addToFeatured } = require('../controllers/couponsConroller');
const router = express.Router();
const { fileUpload, formData } = require('../utils/multer');
const { isAdmin } = require('../middleware/auth');


router.route("/admin/addStore").post(isAdmin,fileUpload.single('storeFile'),addStore);
router.route("/getAllStore").get(getAllStores);
router.route("/getStore/:storeId").get(getSingleStore);
router.route("/admin/delete/:storeId").delete(isAdmin,deleteStore);
router.route("/coupons/:storeId").get(getCoupons);
router.route("/coupons/:storeId/:cId").get(getSingleCoupon);

router.route("/storeDisplay").get(getStoreDisplay);
router.route("/storeDisplay/:storeId").delete(isAdmin,deleteFromDisplay);


router.route("/admin/updateStore/:storeId").put(isAdmin,fileUpload.single('storeFile'),updateStore);
router.route("/admin/addFaq/:storeId").put(isAdmin,formData.none(),addStoreFAQs);

router.route("/admin/addToCarousel/:storeId").post(isAdmin,fileUpload.single('thumbFile'),addToCarousel);
router.route("/admin/addToCard/:storeId").post(isAdmin,fileUpload.single('thumbFile'),addToCard);
router.route("/admin/addToFetured/:storeId").post(isAdmin,addToFeatured);
router.route("/admin/addToOffer/:storeId").post(isAdmin,fileUpload.single('thumbFile'),addToTodaysTop);

router.route("/admin/addCoupons/:storeId").post(isAdmin,addCoupons);
router.route("/coupons").get(getCouponsBy);

router.route("/admin/:cId").put(isAdmin,updateCoupon).delete(isAdmin,deleteCoupon);

router.route("/addRatings/:storeId").put(addStoreRating);
router.route("/redeem/:cId").put(redeem);
router.route("/getRedeemCount/:cId").get(getRedeemCount);

module.exports = router;