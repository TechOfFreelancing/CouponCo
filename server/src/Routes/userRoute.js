const express = require('express');
const { registerUser, loginUser, logout, forgotPassGet, forgotPassPost, resetPassGet, resetPassPost, getUserDetailsWithCoupons, addContacts, addAdvertise, getContacts, deleteContacts } = require('../controllers/userController');
const router = express.Router();


router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);

router.route("/getDetails/:userId").get(getUserDetailsWithCoupons);

router.route("/forgot-password").get(forgotPassGet).post(forgotPassPost);
router.route("/reset-password/:userId/:token").get(resetPassGet).post(resetPassPost);

router.route("/contact/:uId").post(addContacts);
router.route("/contact/:cId").delete(deleteContacts);
router.route("/contacts").get(getContacts);
router.route("/advertise/:uId").post(addAdvertise);

module.exports = router;