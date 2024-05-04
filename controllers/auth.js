import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/User.js"

export const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            phoneNumber,
            role
        } = req.body

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            phoneNumber,
            role
        })
        const savedUser = await newUser.save()
        const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET_KEY)
        res.status(201).json({ user: savedUser, token })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}   

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email: email })      
        if (!user) return res.status(400).json({ message: "Account does not exist." })

        const truePassword = await bcrypt.compare(password, user.password)
        if (!truePassword) return res.status(400).json({ message: "Invalid password." })

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY)
        
        delete user.password
        res.status(200).json({ token, user })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

