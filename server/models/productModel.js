import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        _id: String,
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true,
            minLength: 10,
        },
        category: {
            type: String,
            required: true,
        },
        category2: {
            type: String,
        },
        category3: {
            type: String,
        },
        price: {
            type: Number,
            required: true,
        },
        stock: {
            type: Number,
            required: true
        },
        rate: {
            type: Number,
            required: true
        },
        imageUrl: {
            type: String
        }
    }
)

const Product = mongoose.model("Product", productSchema)
export default Product