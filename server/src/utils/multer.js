const multer = require('multer');

// Multer storage configuration for file upload
const storage = multer.diskStorage({});
const fileUpload = multer({ storage: storage });

// Multer storage configuration for form data (text fields)
const formData = multer();

module.exports = { fileUpload, formData };
