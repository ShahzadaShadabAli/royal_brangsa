import Booking from "../models/booking.js"
import Order from "../models/order.js"

export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).populate('client').populate('order.food')
        res.status(200).json(orders)
    } catch (error) {
       res.status(500).json("Could not get the data") 
    }
}

export const addOrder = async (req, res) => {
    const {client, orders, totalPrice, course} = req.body
    try {
        const booking = await Booking.findOne({client}).sort({createdAt: -1})
        
        const order = await Order.create({
            client, 
            order: orders,
            totalPrice,
            course
        })
        if (booking) {
            booking.orders.push(order._id); 
            await booking.save();
        }
        res.status(200).json(order)
    } catch (error) {
       res.status(500).json("Could not add the data") 
    }
}

export const getOrder = async (req, res) => {
    try {
        const food = await Order.findOne({_id:req.params.id})
        res.status(200).json(food)
    } catch (error) {
       res.status(500).json("Could not get the data") 
    }
}

export const deleteOrder = async (req, res) => {

    try {
        const order = await Order.findByIdAndDelete(req.params.id)
        res.status(200).json(order)
    } catch (error) {
       res.status(500).json("Could not delete the data") 
    }
}

export const updateOrder = async (req, res) => {
    const {name, price} = req.body

    try {
        const food = await Order.findOne({_id:req.params.id})
        if (!food) res.status(404).json("Food not found") 
            Order.name = name
            Order.price = price
            await Order.save()
        res.status(200).json(food)
    } catch (error) {
       res.status(500).json("Could not Update Food") 
    }
}