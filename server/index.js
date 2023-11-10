const express = require('express');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 4000;
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');

var corsOptions = {
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
};

app.use(cors(corsOptions));
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));
app.set('views', path.join(__dirname, 'src' , 'views'));

app.set('view engine', 'ejs');

const user = require('./src/Schema/userSchema');

const authRoute = require('./src/Routes/userRoute');


app.get('/', async (req, res) => {
    res.status(200).json("All Okay!");
})

app.use('/api',authRoute);

const server = app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);

    try {
        user.createUserTable();
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