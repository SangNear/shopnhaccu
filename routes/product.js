const router = require('express').Router()
const multer = require("multer");
const fs = require('fs');
const path = require('path');
const { createProduct, getAllProduct, getProductByName, getProductById, deleteProduct } = require('../controller/productController');



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});


const upload = multer({ storage: storage });
router.get("/", getAllProduct)
router.post("/", upload.single("image"), createProduct)
router.get("/search", getProductByName)
router.get("/:id", getProductById)
router.delete("/:id", deleteProduct)

module.exports = router