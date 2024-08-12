const { default: mongoose } = require("mongoose");

const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        slug: {
            type: String,
            require: true,
            unique: true
        },
        price: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        categories: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category"
        }],
        brand: {
            type: String,
        },
        image: {
            type: [String]
        },

        detail: {
            type: String 
        },
        specification: {
            type: String
        },
        video: {
            type: String
        },

        quantity: {
            type: Number,
        },

        salePrice: {
            type: Number
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model('Product', ProductSchema)
