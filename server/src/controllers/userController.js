const db = require('../config/connection');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require("nodemailer");
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ErrorHandler = require('../utils/errorhandler');


exports.sendMail = async (to, subject, html) => {
    try {
        let transporter = await nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: 'ridhamchauhan693@gmail.com',
                pass: 'yrnjrpxrybemoiyg'
            }
        });

        await transporter.sendMail({
            from: 'ridhamchauhan693@gmail.com',
            to: to,
            subject: subject,
            html: html,
        });

    } catch (error) {
        console.log('Error sending email:', error);
    } 
}

// Register a user
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;

    var role = "General";
    if (email == "admin@gmail.com" && password == "admin@123#") {
        role = "Admin";
    }

    var pass = await bcrypt.hash(password, 10);

    try {
        const sql = `INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)`;

        db.query(sql, [name, email, pass, role], function (err, result) {
            if (err) {
                console.error(err);
                return next(new ErrorHandler("Unable to register user", 400));
            }

            const rId = result.insertId;

            const user = `SELECT * FROM users WHERE user_id = ?`;

            db.query(user, [rId], function (err, resObj) {
                if (err) {
                    console.error(err);
                    return next(new ErrorHandler("Unable to fetch user data", 400));
                }

                const newUser = resObj[0];

                res.status(201).json({ message: "User registered successfully", user: newUser });
            });
        });
    } catch (err) {
        console.log(err);
        return next(new ErrorHandler("Unable to proceed", 400));
    }
});

// login user
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler("Please enter email and password", 400));
    }

    const sql = `SELECT * FROM users WHERE email = ?`;

    db.query(sql, [email], function (err, result) {
        if (err) {
            console.error(err);
            return next(new ErrorHandler("Invalid email or password", 401));
        }

        if (result.length === 0) {
            return next(new ErrorHandler("Invalid email or password", 401));
        }

        const user = result[0];
        const storedPasswordHash = user.password;

        bcrypt.compare(password, storedPasswordHash, function (err, isPasswordMatched) {
            if (err || !isPasswordMatched) {
                return next(new ErrorHandler("Invalid email or password", 401));
            }

            const token = jwt.sign({ userId: user.user_id, email: user.email, role: user.role }, process.env.JWT_SECRET, {
                expiresIn: process.env.JWT_EXPIRE
            });

            const options = {
                expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
                httpOnly: true
            };

            res.status(200).cookie("tokenjwt",token,options).json({ message: "User logged in successfully", user , token});
        });
    });
});

//Logout user 
exports.logout = catchAsyncErrors(async (req, res, next) => {

    res.cookie("tokenjwt", null, {
        httponly: true,
        expires: new Date(Date.now()),
        path: "/"
    });

    res.status(200).json({
        success: true,
        message: "Logged out"
    })
});

// forgot password init
exports.forgotPassGet = catchAsyncErrors(async (req, res, next) => {
    res.render('forgot-password');
});

exports.forgotPassPost = catchAsyncErrors(async (req, res, next) => {
    try {
        const { email } = req.body;

        if (!email) {
            return next(new ErrorHandler("Please enter email", 400));
        }

        const userQuery = `SELECT * FROM users WHERE email = ?`;

        db.query(userQuery, [email], async (err, result) => {
            if (err || result.length === 0) {
                return next(new ErrorHandler("Invalid email or user not found", 404));
            }

            const user = result[0];
            const secret = process.env.JWT_SECRET + user.password;

            const payload = {
                email: user.email,
                id: user.user_id,
            };

            const token = jwt.sign(payload, secret, { expiresIn: '10m' });

            const link = `http://localhost:4000/api/reset-password/${user.user_id}/${token}`;
            console.log(link);

            const to = user.email;
            const subject = 'Reset Password';
            const html = `
                <h1>Password Reset Email</h1>
                <p>Hello,</p>
                <p>You have requested to reset your password. Click the link below to reset your password:</p>
                <a href="${link}">link</a>
                <b>#Note: This link is only valid for 10 minutes</b>
                <p>If you did not request a password reset, please ignore this email.</p>
                <p>Best regards,<br>Team CouponCo</p>
            `;

            await exports.sendMail(to, subject, html);

            res.send("Check your inbox, password reset link has been sent successfully!");
        });
    } catch (error) {
        console.log(error);
        return next(new ErrorHandler("Unable to proceed ", 400));
    }
});

exports.resetPassGet = catchAsyncErrors(async (req, res, next) => {
    try {
        const { userId, token } = req.params;

        const userQuery = `SELECT * FROM users WHERE user_id = ?`;

        db.query(userQuery, [userId], async (err, result) => {
            if (err || result.length === 0) {
                return next(new ErrorHandler("Invalid user", 401));
            }

            const user = result[0];
            const secret = process.env.JWT_SECRET + user.password;

            try {
                const payload = jwt.verify(token, secret);
                res.render('reset-password', { email: user.email });
            } catch (err) {
                console.log("Link Expired! ", err.message);
                res.send(err.message);
            }
        });
    } catch (error) {
        console.log(error);
        return next(new ErrorHandler("Unable to proceed ", 400));
    }
});

exports.resetPassPost = catchAsyncErrors(async (req, res, next) => {
    try {
        const { userId, token } = req.params;
        const { password, password2 } = req.body;

        const userQuery = `SELECT * FROM users WHERE user_id = ?`;

        db.query(userQuery, [userId], async (err, result) => {
            if (err || result.length === 0) {
                return next(new ErrorHandler("Invalid user", 401));
            }

            const user = result[0];
            const secret = process.env.JWT_SECRET + user.password;

            try {
                const payload = jwt.verify(token, secret);

                if (password !== password2) {
                    return next(new ErrorHandler("Passwords do not match", 400));
                }

                const hashedPassword = await bcrypt.hash(password, 10);

                const updatePasswordQuery = `UPDATE users SET password = ? WHERE user_id = ?`;

                db.query(updatePasswordQuery, [hashedPassword, userId], async (err, result) => {
                    if (err) {
                        console.error(err);
                        return next(new ErrorHandler("Unable to reset password", 500));
                    }

                    console.log(result[0]);

                    res.status(200).json({ message: "Password reset successfully!" });
                });
            } catch (err) {
                console.log("Link Expired! ", err.message);
                res.send(err.message);
            }
        });
    } catch (error) {
        console.log(error);
        return next(new ErrorHandler("Unable to proceed ", 400));
    }
});