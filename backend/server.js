import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import colors from "colors"
import morgan from 'morgan'
import productRoutes from "./routes/productRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import uploadRoutes from "./routes/uploadRoutes.js"
import { notFound, errorHandler } from "./middleware/errorMiddleware.js"
import path from 'path'

dotenv.config()

connectDB()
const app = express()
if(process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
app.use(express.json())

app.get("/", (req, res) => {
  res.send("Api is running")
})
app.use("/api/products", productRoutes)
app.use("/api/users", userRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/upload", uploadRoutes)

app.get('/api/config/paypal', (req, res) => {
  res.send({clientId: process.env.PAYPAL_CLIENT_ID})
})

// __dirname is not available if not using esModules , only available if using common js. 
const __dirname = path.resolve()
// console.log(path.join(__dirname, '/uploads'))

// Uploads folder is not accessible by default, we need to make that a static folder so that it can get loaded in the browser
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
})
