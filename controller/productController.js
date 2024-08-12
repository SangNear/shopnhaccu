const fs = require("fs");
const path = require("path");
const Product = require('../models/Product');
const Category = require("../models/Category");
//SEARCH PRODUCT BY PRODUCT
const getProductByName = async (req, res) => {
    try {
        console.log(req.body.title);

        const { title } = req.body

        const regexPattern = new RegExp(title.split(' ').join('|'), 'i');

        const product = await Product.find({ title: { $regex: regexPattern } }).populate('categories');
        if (product) {
            return res.status(200).json(product)
        }
        else {
            return res.status(400).json("Product is not exists in system, Try again!")
        }
    } catch (error) {
        console.log(error)
        return res.status(404).json(error)
    }
}

//GET A PRODUCT
const getAllProduct = async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 })
        return res.status(200).json(products)
    } catch (error) {
        console.log(error)
        return res.status(404).json(error)
    }
}

//CREATE A PRODUC
const createProduct = async (req, res) => {
    try {
        const { title, description, categories, quantity, price } = req.body;
        console.log(req.body);

        const image = req.file;

        if (!title) {
            return res.status(400).json("Title is not empty");
        }
        const titleIsExists = await Product.findOne({ title: title });
        if (titleIsExists) {
            return res.status(500).json("Title is exists! Choose another one");
        }
        // if (!image) {
        //     return res.status(400).json("Image is not empty");
        // }
        if (image) {
            const imgPath = path.join(__dirname, "../images", image.filename);
            const imgBase64 = fs.readFileSync(imgPath, { encoding: "base64" });
            var imgBase64URL = `data:image/${path
                .extname(image.filename)
                .slice(1)};base64,${imgBase64}`;
        }


        const newProduct = await Product.create({
            title,
            description,
            image: imgBase64URL,
            categories,
            quantity,
            price,
        });

        // fs.unlinkSync(imgPath);

        if (categories) {
            for (const categoryId of categories) {
                const category = await Category.findById(categoryId)
                if (category) {
                    category.products.push(newProduct._id)
                    await category.save()
                }
                else {
                    return res.status(500).json("Error while add new product in category")
                }
            }
        }
        await newProduct.save();
        return res.status(200).json(newProduct);
    } catch (error) {
        console.log(error)
        return res.status(500).json("Product create failed!", error)
    }
};


//GET PRODUCT BY ID
const getProductById = async (req, res) => {
    try {

        const product = await Product.findOne({ _id: req.params.id }).populate('categories')
        if (product) {
            return res.status(200).json(product)
        }
        else {
            return res.status(400).json("Product is not exists in system, Try again!")
        }
    } catch (error) {
        console.log(error)
        return res.status(404).json(error)
    }
}

//DELETE PRODUCT
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id)
        if (product && product.categories) {
            for (const categoyId of product.categories) {
                const category = await Category.findById(categoyId)
                console.log("before", category.products);

                if (category) {
                    category.products.remove(req.params.id)
                    await category.save()
                }
            }

            return res.status(200).json("Product deleted successfully!")
        }
        else {
            return res.status(404).json("Product id not valid")
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
}

module.exports = { createProduct, getAllProduct, getProductByName, getProductById, deleteProduct }
