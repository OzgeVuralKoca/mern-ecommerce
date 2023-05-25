import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// .env Configuration
dotenv.config()

const secretKey = process.env.SECRET_KEY

const options = {
    expiresIn: "1d"
}

const token = (payload) => {
    return jwt.sign(payload, secretKey, options)
}

export default token