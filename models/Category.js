const { default: mongoose } = require("mongoose");

const CategorySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String
        },
        product: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            }
        ]
    },
    { timestamps: true }
)

module.exports = mongoose.model('Category', CategorySchema)