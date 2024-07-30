import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, min: 5 },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: true,
    },
    profilePicture: {
        type: String,
        default: '',
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;                