import mongoose from "mongoose";

const orderSchema = new mongoose.Schema (
    {
        _id: String,
        productId: String,
        userId: String,
        quantity: Number,
        price: Number
    }
)

const Order = mongoose.model("Order", orderSchema);
export default Order