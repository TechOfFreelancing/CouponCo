const express = require('express');
const { registerUser, loginUser, logout, forgotPassGet,forgotPassPost,resetPassGet,resetPassPost, getUserDetailsWithCoupons} = require('../controllers/userController');
const router = express.Router();


router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);

router.route("/getDetails/:userId").get(getUserDetailsWithCoupons);

router.route("/forgot-password").get(forgotPassGet).post(forgotPassPost);
router.route("/reset-password/:userId/:token").get(resetPassGet).post(resetPassPost);

module.exports = router;