
import dotenv from 'dotenv'
import express from 'express'
// import bodyParser from 'body-parser'
import dbConnect from './config/db.js'
import authRoutes from './routes/authRoute.js'
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoutes.js'
import cors from 'cors'

if (process.env.NODE_ENV !== 'production') {
    dotenv.config()
}

const app = express()

//Port
const PORT = process.env.PORT

//DB connection
dbConnect()

//Middleware
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true })); // Parse form data
// app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))


//Routes
app.use('/api/v1/auth/',authRoutes)
app.use('/api/v1/auth/category/',categoryRoutes)
app.use('/api/v1/auth/product/',productRoutes)

app.get('/',(req,res)=>{
    res.send({
        message:'Welcome to the Atish\'s World'
    })
})


//Start server
var server = app.listen(PORT,()=>{
    console.log(`Server is running ${process.env.NODE_ENV} mode on http://127.0.0.1:${PORT}`)
    console.log('Address: ',server.address().address)
    console.log('Port: ',server.address().port)
})