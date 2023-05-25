import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
    {
        _id: String,
        productId: String,
        userId: String,
        quantity: Number,
        price: Number
    }
)

const Cart = mongoose.model("Cart", cartSchema)
export default Cart