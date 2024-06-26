import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import morgan from "morgan"
import dotenv from "dotenv"
import helmet from "helmet"
import cors from "cors"
import { fileURLToPath } from "url"
import path from "path"
import multer from "multer"
import { verifyToken } from "./middleware/auth.js"
import { checkRole } from "./middleware/authorization.js"
import emailRoute from "./routes/sendMail.js"
import listTest from "./routes/listTest.js";
import jobRouter from "./routes/jobManagement.js";
// import listTestModel from "./models/ListTest.js"
import routerList from "./routes/listTest.js"
import routerCandidate from "./routes/listRouter.js"
import authRoutes from "./routes/auth.js";
import { register } from "./controllers/auth.js"

// CONFIG
dotenv.config()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(morgan("common"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use("/assets", express.static(path.join(__dirname, "public/assets")))

// FILE STORAGE
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/assets")
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage })

// ROUTES
app.use("/auth", authRoutes)
app.use("/job", jobRouter)
app.use("/email", emailRoute)

app.use("/job", jobRouter, verifyToken, checkRole(["officer"]))
app.use("/listTest", listTest)
app.use("/recruiments", listTest)
app.use("/routerCandidate", routerCandidate)

// ROUTES WITH FILES
app.post("/auth/register", register, upload.single("picture"))

const PORT = process.env.PORT || 8000

app.post('/list', (req, res) => {
    res.status(200).send("hello mindx")
})

mongoose.connect(process.env.MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .catch(err => console.log(`Error: ${err}`))
app.listen(PORT, () => console.log(`Running in port ${PORT}`))
