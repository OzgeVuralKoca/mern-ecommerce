import express from 'express'
import { v4 as uuidv4 } from 'uuid'
import Cart from '../models/cartModel.js'
import Product from '../models/productModel.js'

const cartRouter = express.Router()

// Add product in cart
cartRouter.post("/add", async (req, res) => {
    try {
        const {productId, userId} = req.body;
        let cart = new Cart({
            _id: uuidv4(),
            userId: userId,
            productId: productId
        });
        await cart.save();

        let product = await Product.findById(productId);
        product.stock = product.stock - 1;
        await Product.findByIdAndUpdate(productId, product)

        res.json({message: "Ürün başarıyla sepete eklendi!"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

// Get products in cart
cartRouter.post("/", async(req, res)=>{
    try {
        const {userId} = req.body;
        const cart = await Cart.aggregate([
            {
                $match: {userId: userId}
            },
            {
                $lookup:{
                    from: "products",
                    localField: "productId",
                    foreignField: "_id",
                    as: "products"
                  }
            }
        ]);

        res.json(cart);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

// Remove product on cart
cartRouter.post("/remove", async(req,res)=>{
    try {
        const {_id} = req.body;
        const cart = await Cart.findById(_id);
        const product = await Product.findById(cart.productId);
        product.stock += 1;
        await Product.findByIdAndUpdate(product._id, product);
        await Cart.findByIdAndRemove(_id);
        res.json({message: "Silme işlemi başarılı"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

export default cartRouter