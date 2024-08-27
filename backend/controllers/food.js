import Food from "../models/food.js"

export const getFoods = async (req, res) => {
    try {
        const foods = await Food.find({})
        res.status(200).json(foods)
    } catch (error) {
       res.status(500).json("Could not get the data") 
    }
}

export const addFood = async (req, res) => {
    const {name, price} = req.body
    try {
        const food = await Food.create({
            name, 
            price
        })
        res.status(200).json(food)
    } catch (error) {
       res.status(500).json("Could add the data") 
    }
}

export const getFood = async (req, res) => {
    try {
        const food = await Food.findOne({_id:req.params.id})
        res.status(200).json(food)
    } catch (error) {
       res.status(500).json("Could not get the data") 
    }
}

export const deleteFood = async (req, res) => {

    try {
        const food = await Food.findByIdAndDelete(req.params.id)
        res.status(200).json(food)
    } catch (error) {
       res.status(500).json("Could not delete the data") 
    }
}

export const updateFood = async (req, res) => {
    const {name, price} = req.body

    try {
        const food = await Food.findOne({_id:req.params.id})
        if (!food) res.status(404).json("Food not found") 
            food.name = name
            food.price = price
            await food.save()
        res.status(200).json(food)
    } catch (error) {
       res.status(500).json("Could not Update Food") 
    }
}