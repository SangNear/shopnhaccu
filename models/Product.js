const { default: mongoose } = require("mongoose");

const ProductSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String,
        },
        categories: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category"
        }],
        image: {
            type: [String]
        },
        quantity: {
            type: Number
        },
        price: {
            type: Number
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model('Product', ProductSchema)
