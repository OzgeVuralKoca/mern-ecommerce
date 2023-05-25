import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        id: String,
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
        imgUrl: {
            type: String
        }
    }
)

const Product = mongoose.model("Product", productSchema)
export default Product