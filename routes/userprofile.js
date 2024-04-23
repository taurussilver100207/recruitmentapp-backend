import express from "express"
import { getUserProfile } from "../controllers/userprofile.js"
import { verifyToken } from "../middleware/auth.js"
const router = express.Router()

router.get("/:userId", verifyToken, getUserProfile)

export default router