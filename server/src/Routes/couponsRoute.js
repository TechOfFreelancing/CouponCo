const express = require('express');
const {
  addStore,
  addStoreFAQs,
  addStoreRating,
  addCoupons,
  getStoreDisplayAllData,
  getStoreDisplay,
  deleteCoupon,
  updateStore,
  updateCoupon,
  deleteStore,
  getCoupons,
  getSingleCoupon,
  getSingleStore,
  getAllStores,
  getCouponsBy,
  addToCarousel,
  addToCard,
  deleteFromDisplay,
  addToTodaysTop,
  addToFeatured,
  addStoreIds,
  removeStoreId,
  getAllStoreIds,
  incrementUserCount,
  saveCouponForUser,
  unsaveCouponForUser,
  getUnverifiedCoupons,
  decreaseCouponsOffers,
  getCategoryCoupons,
  getEventsForCoupons,
  getDataForEvent,
  addCategoryStoreId,
  removePopularStore,
  addEventStoreId,
  removePopularStoreEvent,
  similarAndPopularStore,
  updateUserCount,
  addCoupon
} = require("../controllers/couponsConroller")
const router = express.Router();
const { fileUpload, formData } = require('../utils/multer');
const { isAdmin } = require('../middleware/auth');


router.route("/admin/addStore").post(isAdmin,fileUpload.single('storeFile'),addStore);
router.route("/getAllStore").get(getAllStores);
router.route("/getStore/:storeId").get(getSingleStore);
router.route("/similarAndPopularStore/:id").get(similarAndPopularStore)
router.route("/updateUserCount").put(updateUserCount)
router.route("/admin/delete/:storeId").delete(isAdmin,deleteStore);
router.route("/coupons/:storeId").get(getCoupons);
router.route("/coupons/:storeId/:cId").get(getSingleCoupon);
router.route("/coupon/:category").get(getCategoryCoupons);
router.route("/eventcoupon/:cId").get(getEventsForCoupons);
router.route("/events/:event").get(getDataForEvent);

router.route("/storeDisplay/:category").get(getStoreDisplayAllData);
router.route("/storeDisplay").get(getStoreDisplay);
router.route("/storeDisplay/:storeId").delete(isAdmin,deleteFromDisplay);


router.route("/admin/updateStore/:storeId").put(isAdmin,fileUpload.single('storeFile'),updateStore);
router.route("/admin/addFaq/:storeId").put(isAdmin,formData.none(),addStoreFAQs);

router.route("/admin/addToCarousel/:storeId").post(isAdmin,fileUpload.single('thumbFile'),addToCarousel);
router.route("/admin/addToCard/:storeId").post(isAdmin,fileUpload.single('thumbFile'),addToCard);
router.route("/admin/addToFetured/:storeId").post(isAdmin,addToFeatured);
router.route("/admin/addToOffer/:storeId").post(isAdmin,fileUpload.single('thumbFile'),addToTodaysTop);

router.route("/admin/addClouser/:storeId").post(isAdmin,addStoreIds);
router.route("/admin/addPopularForCategory/:storeId").post(isAdmin,addCategoryStoreId);
router.route("/admin/addPopularForEvent/:storeId").post(isAdmin,addEventStoreId);
router.route("/admin/removeClouser/:storeId").delete(isAdmin,removeStoreId);
router.route("/admin/removePopularForCategory/:storeId").delete(isAdmin,removePopularStore);
router.route("/admin/removePopularForEvent/:storeId").delete(isAdmin,removePopularStoreEvent);

router.route("/admin/addCoupon").post(addCoupon)
router.route("/admin/addCoupons/:storeId").post(addCoupons);
router.route("/admin/getUnverifed").get(getUnverifiedCoupons);

router.route("/coupons").get(getCouponsBy);
router.route("/clouser").get(getAllStoreIds);
router.route("/inCount/:cId").patch(incrementUserCount);
router.route("/saveCoupon/:cId").post(saveCouponForUser);
router.route("/unsaveCoupon/:cId").delete(unsaveCouponForUser);

router.route("/decreaseCount/:storeId").patch(decreaseCouponsOffers);
router.route("/admin/:cId").put(isAdmin,updateCoupon).delete(isAdmin,deleteCoupon);

router.route("/addRatings/:storeId").put(addStoreRating);

module.exports = router;