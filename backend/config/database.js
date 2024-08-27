import dotenv from "dotenv"
import mongoose from "mongoose"

dotenv.config()

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI)
        console.log("database connected")
    } catch (error) {
        console.log(error.message)
    }
}

export default connectDB