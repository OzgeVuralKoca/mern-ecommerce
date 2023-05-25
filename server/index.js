import { connect } from "mongoose";
import { config } from "dotenv";
import express, { json } from "express";
import cors from "cors";

import authRouter from "./routes/authRoutes.js";

// .env Configuration
config()

// Api request
const app = express();

// JSON api request
app.use(express.json());

// cors policy
app.use(cors());

// MongoDb Connection
const URI = process.env.MONGO_URL
connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("MongoDb bağlantısı başarılı!")
    }).catch((error) => {
        console.log("MongoDb bağlantısı başarısız: ", error);
    })

// Auth Router
app.use("/api/auth", authRouter)

// Listen Port
const port = process.env.PORT || 5000
app.listen(
    port,
    () => { console.log(`Uygulama ${port} portunu dinliyor.`); }
)