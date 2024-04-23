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
import authRoutes from "./routes/auth.js";
import { verifyToken } from "./middleware/auth.js"
// CONFIG
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config()
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

// ROUTES WITH FILES

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

console.log("Hello World");
console.log("Override something!!!");
console.log('hehehe thay đổi 1 chutts');
