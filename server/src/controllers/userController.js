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
};

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;

    var role = "General";
    if (email == "admin@gmail.com" && password == "admin@123#") {
        role = "Admin";
    }

    var pass = await bcrypt.hash(password, 10);

    try {
        const [result] = await db.query('INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)', [name, email, pass, role]);
        const rId = result.insertId;

        const [resObj] = await db.query('SELECT * FROM users WHERE user_id = ?', [rId]);
        const newUser = resObj[0];

        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (err) {
        console.log(err);
        return next(new ErrorHandler("Unable to proceed", 400));
    }
});

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler("Please enter email and password", 400));
    }

    try {
        const [result] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

        if (result.length === 0) {
            return next(new ErrorHandler("Invalid email or password", 401));
        }

        const user = result[0];
        const storedPasswordHash = user.password;

        const isPasswordMatched = await bcrypt.compare(password, storedPasswordHash);

        if (!isPasswordMatched) {
            return next(new ErrorHandler("Invalid email or password", 401));
        }

        const token = jwt.sign({ userId: user.user_id, email: user.email, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE
        });

        const options = {
            expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
            httpOnly: true
        };

        res.status(200).cookie("tokenjwt", token, options).json({ message: "User logged in successfully", user, token });
    } catch (err) {
        console.error(err);
        return next(new ErrorHandler("Invalid email or password", 401));
    }
});

exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie("tokenjwt", null, {
        httponly: true,
        expires: new Date(Date.now()),
        path: "/"
    });

    res.status(200).json({
        success: true,
        message: "Logged out"
    });
});

exports.forgotPassGet = catchAsyncErrors(async (req, res, next) => {
    res.render('forgot-password');
});

exports.forgotPassPost = catchAsyncErrors(async (req, res, next) => {
    try {
        const { email } = req.body;

        if (!email) {
            return next(new ErrorHandler("Please enter email", 400));
        }

        const [result] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

        if (result.length === 0) {
            return next(new ErrorHandler("Invalid email or user not found", 404));
        }

        const user = result[0];
        const secret = process.env.JWT_SECRET + user.password;

        const payload = {
            email: user.email,
            id: user.user_id,
        };

        const token = jwt.sign(payload, secret, { expiresIn: '10m' });

        const link = `http://13.201.29.102:3000/api/reset-password/${user.user_id}/${token}`;
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
    } catch (error) {
        console.log(error);
        return next(new ErrorHandler("Unable to proceed ", 400));
    }
});

exports.resetPassGet = catchAsyncErrors(async (req, res, next) => {
    try {
        const { userId, token } = req.params;

        const [result] = await db.query('SELECT * FROM users WHERE user_id = ?', [userId]);

        if (result.length === 0) {
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
    } catch (error) {
        console.log(error);
        return next(new ErrorHandler("Unable to proceed ", 400));
    }
});

exports.resetPassPost = catchAsyncErrors(async (req, res, next) => {
    try {
        const { userId, token } = req.params;
        const { password, password2 } = req.body;

        const [result] = await db.query('SELECT * FROM users WHERE user_id = ?', [userId]);

        if (result.length === 0) {
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

            const [updateResult] = await db.query('UPDATE users SET password = ? WHERE user_id = ?', [hashedPassword, userId]);

            console.log(updateResult[0]);

            res.status(200).json({ message: "Password reset successfully!" });
        } catch (err) {
            console.log("Link Expired! ", err.message);
            res.send(err.message);
        }
    } catch (error) {
        console.log(error);
        return next(new ErrorHandler("Unable to proceed ", 400));
    }
});

// Get User Details with Saved Coupons Data
exports.getUserDetailsWithCoupons = catchAsyncErrors(async (req, res, next) => {
    const { userId } = req.params;
    try {
        const getCouponsForUserSql = `
            SELECT c.* FROM coupons c
            INNER JOIN saved_coupons sc ON c.coupon_id = sc.coupon_id
            WHERE sc.user_id = ?;
        `;
        const couponsData = await db.query(getCouponsForUserSql, [userId]);

        // Fetch user details from the 'users' table
        const getUserDetailsSql = `SELECT * FROM users WHERE user_id = ?`;
        const userDetails = await db.query(getUserDetailsSql, [userId]);
        const user = userDetails[0];

        res.status(200).json({ user, savedCoupons: couponsData[0] });
    } catch (err) {
        console.error(err);
        return next(new ErrorHandler("Unable to fetch user details with saved coupons", 400));
    }
});

exports.addContacts = catchAsyncErrors(async (req, res, next) => {
    const { uId } = req.params;
    const { name, email, message } = req.body;
    try {

        if (!name || !email || !message) {
            return next(new ErrorHandler("Fill all details", 400));
        }

        const [resObj] = await db.query('SELECT * FROM users WHERE user_id = ?', [uId]);

        if (resObj.length == 0) {
            return next(new ErrorHandler("User not found", 400));
        }

        const [result] = await db.query('INSERT INTO contacts (user_id, fullname, email, message,isAccepted) VALUES (?, ?, ?, ?,?)', [uId, name, email, message, 1]);


        return res.status(201).json({ message: "Contact Details Send Successfully", user: uId });
    } catch (err) {
        console.log(err);
        return next(new ErrorHandler("Unable to proceed", 400));
    }
})

exports.addAdvertise = catchAsyncErrors(async (req, res, next) => {
    const { uId } = req.params;
    const { name, company, url, email, affiliate, message, affiliate_network } = req.body;

    try {
        const [user] = await db.query('SELECT * FROM users WHERE user_id = ?', [uId]);

        if (user.length === 0) {
            return res.status(404).send("User not found");
        }

        if (!name || !company || !url || !email || !affiliate || !message) {
            return res.status(401).send("Fill All Details");
        }

        const insertColumns = ['user_id', 'fullname', 'company', 'website_url', 'email', 'affiliate', 'message', 'isAccepted'];
        const insertValues = [uId, name, company, url, email, affiliate, message, '1'];

        if (affiliate_network) {
            insertColumns.push('affiliate_network');
            insertValues.push(affiliate_network);
        }

        const placeholders = Array(insertColumns.length).fill('?').join(', ');
        const query = `INSERT INTO advertise (${insertColumns.join(', ')}) VALUES (${placeholders})`;
        const [result] = await db.query(query, insertValues);

        return res.status(201).json({ message: "Data Send Successfully", user: uId });
    } catch (err) {
        console.log(err);
        return next(new ErrorHandler("Unable to proceed", 400));
    }
});

exports.getContacts = catchAsyncErrors(async (req, res, next) => {
    try {
        const contacts = `
            select * from contacts
        `;
        const contactData = await db.query(contacts);

        res.status(200).json(contactData[0]);
    } catch (err) {
        console.error(err);
        return next(new ErrorHandler("Unable to fetch user contact data", 400));
    }
})

exports.deleteContacts = catchAsyncErrors(async (req, res, next) => {
    const { cId } = req.params;
    try {
        const contact = `
            delete from contacts where contact_id = ?
        `;
        const contactDelete = await db.query(contact,[cId]);

        res.status(200).json("Deleted Successfully");
    } catch (err) {
        console.error(err);
        return next(new ErrorHandler("Unable to fetch user contact data", 400));
    }
})

