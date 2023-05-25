import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        _id: String,
        name: {
            type: String,
            required: true,
            minLength: 3
        },
        email: {
            type: String,
            required: true,
            minLength: 3,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        isAdmin: Boolean
    }
)

const User = mongoose.model("User", userSchema)
export default User