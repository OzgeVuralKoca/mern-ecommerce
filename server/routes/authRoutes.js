import express from "express";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt"
import User from "../models/userModel.js";
import token from "../services/token.js"

const authRouter = express.Router();

// Register
authRouter.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // bcrypt password
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)

        let user = new User(
            {
                _id: uuidv4(),
                name: name,
                email: email,
                password: hashedPassword,
                isAdmin: false
            }
        );
        await user.save();
        
        const payload = {
            user: user
        }
        res.json({ user: user, token: token(payload) })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// Login
authRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });

        if (!user) {
            res.status(400).json({ message: "Mail adresiniz veya şifreniz hatalı!" })
        } else {
            const isPasswordMatch = await bcrypt.compare(password, user.password)
            if (!isPasswordMatch) {
                res.status(400).json({ message: "Mail adresiniz veya şifreniz hatalı!" })
            } else {
                const payload = {
                    user: user
                };
                res.json({ user: user, token: token(payload) });
            }
        };
    } catch (error) {
        res.status(500).json({ error: error.message })
    };
});

export default authRouter;