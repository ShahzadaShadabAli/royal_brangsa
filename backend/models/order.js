import mongoose from "mongoose";

const OrderSchema = mongoose.Schema({
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    order: [{
        food:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Food"
        },
        qty: Number 
    }],
    totalPrice: Number,
    course: String
}, {
    timestamps: true
})

const Order = mongoose.model("Order", OrderSchema)
export default Order;