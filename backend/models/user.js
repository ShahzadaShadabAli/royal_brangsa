import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    fullname: String,
    cnic: String,
    phone: String,
    total_members: Number,
    joined: {
        type: Date,
        default: Date.now
    },
    left: Date
})

const User = mongoose.model("User", userSchema)
export default User;