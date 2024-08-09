const router = require('express').Router()
const multer = require("multer");
const fs = require('fs');
const path = require('path');
const { createProduct } = require('../controller/productController');

//Create a product

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});


const upload = multer({ storage: storage });
router.post("/", upload.single("image"), createProduct)