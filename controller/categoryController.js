const Category = require('../models/Category')
const Product = require('../models/Product')


const getAllCategory = async (req, res) => {
    try {
        const categories = await Category.find().sort({ createdAt: -1 }).populate('products')
        return res.status(200).json(categories)
    } catch (error) {
        console.log(error)
        return res.status(404).json
    }
}
const createCategory = async (req, res) => {
    try {
        const { title, description, products } = req.body
        
        
        if (!title) {
            return res.status(400).json("Title is not empty");
        }
        const titleIsExists = await Category.findOne({ title: title });
        if (titleIsExists) {
            return res.status(500).json("Title is exists! Choose another one");
        }

        const newCategory = await Category.create({
            title, description, products
        })

        await newCategory.save();

        if (products) {
            for (const productId of products) {
                const product = await Product.findById(productId)
                if (product) {
                    product.categories.push(newCategory._id)
                    await product.save()
                }
            }
        }
        return res.status(200).json(newCategory);
    } catch (error) {
        console.log(error)
        return res.status(500).json("Category create failed!")
    }
}

module.exports = { createCategory, getAllCategory }