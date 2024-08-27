import mongoose from "mongoose";

const BookingSchema = mongoose.Schema({
    invoice_no: Number,
    paid: {
        type: Boolean,
        default: false
    },
    paidAt: Date,
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order"
    }],
    rooms: [{
            room: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Room"
            },
            price: Number
    }],
    bookingPrice: Number,
    joiningDate: Date,
    leavingDate: Date,
    totalPrice: Number
}, {
    timestamps: true
})

const Booking = mongoose.model("Booking", BookingSchema)
export default Booking;