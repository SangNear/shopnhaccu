

const router = require('express').Router()
const { createCategory, getAllCategory } = require('../controller/categoryController')

//Create a product

router.get("/", getAllCategory)
router.post("/", createCategory)

module.exports = router