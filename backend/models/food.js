import mongoose from "mongoose";

const foodSchema = mongoose.Schema({
    name: String,
    price: Number,
}, {
    timestamps: true
})

const Food = mongoose.model("Food", foodSchema)
export default Food;