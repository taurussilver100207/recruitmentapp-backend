import express from "express"
import { getUserByEmail } from "../controllers/getUser.js"

const getUserRouter = express.Router()

getUserRouter.get("/getUser", getUserByEmail)

export default getUserRouter;