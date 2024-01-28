const express = require('express');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 4000;
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');


var corsOptions = {
    origin: ['http://127.0.0.1:5173', 'http://localhost:5173', 'http://13.201.29.102:5173', 'https://coupon-co.vercel.app'],
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify the allowed headers
    credentials: true
};

app.use(cors(corsOptions));
app.use(cookieParser());

// app.use(formData.array());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));
app.set('views', path.join(__dirname, 'src', 'views'));

app.set('view engine', 'ejs');

const user = require('./src/Schema/userSchema');
const Coupons = require('./src/Schema/coupons');
const EventCategory = require('./src/Schema/eventCategory');

const authRoute = require('./src/Routes/userRoute');
const couponsRoute = require('./src/Routes/couponsRoute');
const festRoute = require('./src/Routes/festivalRoute');
const eventCategoryRoute = require('./src/Routes/eventCategoryRoute');


app.get('/', async (req, res) => {
    res.status(200).json("All Okay!");
})

app.use('/api', authRoute, couponsRoute, festRoute, eventCategoryRoute);

const server = app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);

    try {
        user.createUserTable();
        user.createContactDetailsTable();
        user.createAdvertiseTable()
        Coupons.createStoreTable();
        Coupons.createSimilarTable();
        Coupons.createCouponsTable();
        Coupons.createShowStoreTable();
        Coupons.createFestivalShowcaseTable();
        Coupons.createSavedCouponsTable();
        EventCategory.createCategoryTable();
        EventCategory.createEventShowcaseTable();
        EventCategory.createEventTable();
    } catch (err) {
        console.log(err);
    }
})

process.on("unhandledRejection", (err) => {
    console.log(`Error : ${err.message}`);
    console.log(`Shutting down the server due to unhandled Promise Rejection`)

    server.close(() => {
        process.exit(1);
    })
})
