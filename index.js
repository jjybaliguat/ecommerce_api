import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './db/dbConnect.js'
import errorHandler from './middlewares/errorMiddleware.js'
import userRoute from './routes/userRoutes.js'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'

dotenv.config()

const app = express()
app.use(bodyParser.json())
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended: false}))

app.use("/api/user", userRoute)

app.get("/", (req, res) => {
    res.send("Home")
})

app.use(errorHandler)

const PORT = process.env.PORT || 5000
const DB_URL = process.env.MONGO_URI

const start = async () => {
    try {
        connectDB(DB_URL)
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()