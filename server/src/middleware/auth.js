const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require('jsonwebtoken');


exports.isAdmin = catchAsyncErrors(async (req, res, next) => {
    const { tokenjwt } = req.cookies;


    if (!tokenjwt) {
        return next(new ErrorHandler("Please login to access the resources", 401));
    }

    const decodedData = jwt.verify(tokenjwt, process.env.JWT_SECRET);
    
    if (decodedData.role !== 'Admin') {
        return next(new ErrorHandler("Only Admin can access this resource", 403));
    }

    next();
});