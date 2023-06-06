import express from "express"
import { v4 as uuidv4 } from "uuid"
import Product from "../models/productModel.js"
import upload from "../services/file.js"

const productRouter = express.Router()

// Products List
productRouter.get("", async (req, res) => {
        try {
            const products = await Product.find({}).sort({ name: 1 })
            res.json(products)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    })

// Product add
productRouter.post("/add", upload.single("image"), async (req, res) => {
        try {
            const {
                name, description, category, category2, category3, price, stock, rate
            } = req.body;
            const product = new Product({
                _id: uuidv4(),
                name: name,
                description: description,
                category: category,
                category2: category2,
                category3: category3,
                price: price,
                stock: stock,
                rate: rate,
                imageUrl: req.file.path
            });

            await product.save()
            res.json({ message: "Ürün kaydı başarıyla tamamlandı!" })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    })

// Product delete
productRouter.post("/remove", async (req, res) => {
        try {
            const { _id } = req.body;
            await Product.findByIdAndRemove(_id)
            res.json({ message: "Ürün silme işleminiz başarıyla gerçekleşti!" })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    })

export default productRouter