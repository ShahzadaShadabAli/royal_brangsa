import mongoose from "mongoose";

const roomSchema = mongoose.Schema({
    name: String
}, {
    timestamps: true
})

const Room = mongoose.model("Room", roomSchema)
export default Room;