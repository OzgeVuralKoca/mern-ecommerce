import { connect } from "mongoose";
import { config } from "dotenv";
import express from "express";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

import authRouter from "./routes/authRoutes.js";
import productRouter from "./routes/productRoutes.js";
import cartRouter from "./routes/cartRoutes.js";

// .env Configuration
config();

// Api request
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// JSON api request
app.use(express.json());

// cors policy
app.use(cors());

// read image
app.use("/uploads", express.static(join(__dirname, "uploads")));

// MongoDb Connection
const URI = process.env.MONGO_URL;
connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log("MongoDb bağlantısı başarılı!");
  })
  .catch((error) => {
    console.log("MongoDb bağlantısı başarısız: ", error);
  });

// Auth Router
app.use("/api/auth", authRouter);

// Product Router
app.use("/api/products", productRouter);

//Cart Router
app.use("/api/cart", cartRouter);

// Listen Port
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Uygulama ${port} portunu dinliyor.`);
});