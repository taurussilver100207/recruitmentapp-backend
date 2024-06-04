import express from "express"
import { getUsersByEmails } from "../controllers/getUser.js"

const getUserRouter = express.Router()

getUserRouter.get("/getUser", getUsersByEmails)

export default getUserRouter;