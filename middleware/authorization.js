import User from "../models/User";

const checkRole = (roles) => async (req, res, next) => {
    const { email } = req.body

    const user = await User.findOne({ email })
    !roles.includes(user.role)
        ? res.status(401).json("Sorry you are unable to access this feature")
        : next()
}