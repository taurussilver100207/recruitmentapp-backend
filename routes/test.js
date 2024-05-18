import express from "express"
import { joinTest, saveAnswer, submitTest } from "../controllers/test.js"

const router = express.Router()

router.get("/joinTest", joinTest)
router.post("/saveAnswer", saveAnswer)
router.post("/submitTest/:cvId", submitTest)