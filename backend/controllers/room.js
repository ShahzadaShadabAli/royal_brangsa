import Room from "../models/room.js"

export const getRooms = async (req, res) => {
    try {
        const rooms = await Room.find({})
        res.status(200).json(rooms)
    } catch (error) {
       res.status(500).json("Could not get the data") 
    }
}

export const addRoom = async (req, res) => {
    const {name} = req.body
    try {
        const food = await Room.create({
            name
        })
        res.status(200).json(food)
    } catch (error) {
       res.status(500).json("Could not add the data") 
    }
}

export const getRoom = async (req, res) => {
    try {
        const room = await Room.findOne({_id:req.params.id})
        res.status(200).json(room)
    } catch (error) {
       res.status(500).json("Could not get the data") 
    }
}