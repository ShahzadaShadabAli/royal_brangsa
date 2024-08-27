import User from "../models/user.js"

export const getUsers = async (req, res) => {
    try {
        const users = await User.find({})
        res.status(200).json(users)
    } catch (error) {
       res.status(500).json("Could not get the data") 
    }
}

export const getCount = async (req, res) => {
    try {
        const usersCount = await User.countDocuments()
        res.status(200).json(usersCount)
    } catch (error) {
       res.status(500).json("Could not get the data") 
    }
}

export const getUser = async (req, res) => {
    try {
        const user = await User.findOne({_id: req.params.id})
        res.status(200).json(user)
    } catch (error) {
       res.status(500).json("Could not get the data") 
    }
}

export const addUser = async (req, res) => {
    const {fullname, cnic, phone, total_members} = req.body
    console.log(req.body)
    try {
        const users = await User.create({
            fullname,
            cnic,
            phone,
            total_members
        })
        res.status(200).json(users)
    } catch (error) {
       res.status(500).json("Could add the data") 
    }
}

export const deleteUser = async (req, res) => {
    console.log(req.params.id)
    try {
        const users = await User.findByIdAndDelete(req.params.id)
        res.status(200).json(users)
    } catch (error) {
       res.status(500).json("Could not delete the data") 
    }
}

export const updateUser = async (req, res) => {
    const {fullname, cnic, phone, total_members} = req.body

    try {
        const user = await User.findOne({_id:req.params.id})
        if (!user) res.status(404).json("User not found") 
            user.fullname = fullname
            user.total_members = total_members
            user.cnic = cnic
            user.phone = phone
            await user.save()
        res.status(200).json(user)
    } catch (error) {
       res.status(500).json("Could not Update User") 
    }
}